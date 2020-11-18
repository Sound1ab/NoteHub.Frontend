import CodeMirror from 'codemirror'
import React, { useEffect, useState } from 'react'
import SimpleMDE from 'react-simplemde-editor'

import {
  useEasyMDE,
  useModalToggle,
  useReadCurrentPath,
  useReadFile,
  useUpdateFile,
} from '../../../../../hooks'
import { styled } from '../../../../../theme'
import { IPosition } from '../../../../../types'
import { isFile, isNumber } from '../../../../../utils'
import { Fade } from '../../../../animation'
import { MessagesFragment } from '../../../../apollo'
import { ErrorToast, Icon } from '../../../../atoms'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Style } from './MarkdownEditor.styles'
import { renderMarkdown } from './renderMarkdown'
import { renderMdx } from './renderMdx'
import { Widget } from './Widget/Widget'

interface IMarker {
  marker: CodeMirror.TextMarker
  options: {
    id: string
    coords: { left: number; right: number; top: number; bottom: number }
    isActive: boolean
    message: string
  }
}

interface IActiveWidget {
  coords: { left: number; right: number; top: number; bottom: number }
  message: string
}

export function MarkdownEditor() {
  const currentPath = useReadCurrentPath()
  const { file, error: readError } = useReadFile()
  const [updateFile, { loading }] = useUpdateFile()
  const {
    setEasyMDE,
    markText,
    posFromIndex,
    charCoords,
    findMarksAt,
    coordsChar,
    getScrollInfo,
  } = useEasyMDE()
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [activeWidget, setActiveWidget] = useState<IActiveWidget | null>(null)
  const { isOpen, setOpen } = useModalToggle()

  const nodes = file?.messages?.nodes
    ? JSON.stringify(file?.messages.nodes)
    : undefined

  useEffect(() => {
    if (!nodes || !file?.readAt) {
      return
    }

    // Create markers
    ;(JSON.parse(nodes) as MessagesFragment['nodes']).forEach((message) => {
      const startOffset = message.location?.start?.offset
      const endOffset = message.location?.end?.offset

      if (!isNumber(startOffset) || !isNumber(endOffset)) {
        return
      }

      const widgetMessage = message.message

      if (!widgetMessage) {
        return
      }

      // Using the absolute offset get the line and character position in the
      // editor
      const startPosition = posFromIndex(startOffset)
      const endPosition = posFromIndex(endOffset)

      if (!startPosition || !endPosition) {
        return
      }

      // Mark it
      const marker = markText?.(
        { line: startPosition.line, ch: startPosition.ch },
        { line: endPosition.line, ch: endPosition.ch },
        {
          css:
            'text-decoration: underline; text-decoration-color: red; text-decoration-style: wavy',
        }
      )

      if (!marker) {
        return
      }

      // Get the absolute position of the marker based on the text area
      const coords = charCoords(
        { line: startPosition.line, ch: startPosition.ch },
        'local'
      )

      if (!coords) {
        return
      }

      setMarkers((markers) => [
        ...markers,
        {
          marker,
          options: {
            // @ts-ignore
            id: marker.id,
            coords,
            isActive: false,
            message: widgetMessage,
          },
        },
      ])
    })
  }, [nodes, markText, posFromIndex, file?.readAt, charCoords])

  if (readError) {
    ErrorToast(`Could not read file. Please try again.`)
  }

  async function handleUpdateFile(value: string) {
    // Clear markers
    if (markers.length > 0) {
      removeWidget()
      markers.forEach((marker) => marker.marker?.clear?.())
      setMarkers([])
    }

    try {
      await updateFile(currentPath, value)
    } catch (error) {
      ErrorToast(`There was an issue updating your document. ${error.message}`)
    }
  }

  function handleSetMarkdownCursorPosition(currentCursorPosition: IPosition) {
    localState.cursorPositionVar({
      ...currentCursorPosition,
      __typename: 'Position',
    })
  }

  const shouldRenderMdx = true

  if (!isFile(currentPath)) {
    return null
  }

  function handleEditorClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // Get line and character given the position of the mouse in the editor
    const lineCh = coordsChar({ left: e.clientX, top: e.clientY }, 'page')

    if (!lineCh) {
      return
    }

    // Check the editor to see if there is a marker at that position
    const selectedMarkers = findMarksAt(lineCh)

    // If there is no marker there hide widget
    if (!selectedMarkers || selectedMarkers.length === 0) {
      removeWidget()
      return
    }

    // Get the absolute position of the marker based on the text area
    const coords = charCoords({ line: lineCh.line, ch: lineCh.ch }, 'local')

    if (!coords) {
      return
    }

    // Find which marker from our set of markers is active based on the id.
    const activeMarker = markers.find((marker) =>
      selectedMarkers.find(
        // @ts-ignore
        (selectedMarker) => selectedMarker.id === marker.options.id
      )
    )

    if (!activeMarker) {
      return
    }

    // Update the position of the widget to take into account any scrolling
    // done within the textarea.
    setActiveWidget({
      coords: {
        ...coords,
        left: coords.left,
        top: coords.top - (getScrollInfo()?.top ?? 0),
      },
      message: activeMarker.options.message,
    })
    setOpen(true)
  }

  function removeWidget() {
    setOpen(false)
  }

  return (
    <Style aria-label="Markdown editor">
      <Fade show={loading}>
        <Spinner size="1x" icon="spinner" />
      </Fade>
      <Fade show={isOpen}>
        <Widget
          position={activeWidget?.coords}
          message={activeWidget?.message}
        />
      </Fade>
      <span onClick={handleEditorClick}>
        <SimpleMDE
          key={file?.path}
          className="MarkdownEditor-wrapper"
          onChange={handleUpdateFile}
          value={file?.content ?? ''}
          getLineAndCursor={handleSetMarkdownCursorPosition}
          events={{ scroll: removeWidget, viewportChange: removeWidget }}
          options={{
            spellChecker: false,
            nativeSpellcheck: false,
            toolbar: true,
            status: true,
            theme: 'darcula',
            previewRender(text) {
              return shouldRenderMdx ? renderMdx(text) : renderMarkdown(text)
            },
          }}
          getMdeInstance={setEasyMDE}
        />
      </span>
    </Style>
  )
}

const Spinner = styled(Icon)`
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.text.primary};
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  margin: ${({ theme }) => theme.spacing.xs};
  animation-fill-mode: forwards;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
