import React, { useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'

import {
  useEasyMDE,
  useReadCurrentPath,
  useReadFile,
  useUpdateFile,
} from '../../../../../hooks'
import { IPosition } from '../../../../../types'
import { isFile, isNumber } from '../../../../../utils'
import { MessagesFragment } from '../../../../apollo'
import { ErrorToast } from '../../../../atoms'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Style } from './MarkdownEditor.styles'
import { renderMarkdown } from './renderMarkdown'
import { renderMdx } from './renderMdx'

type MarkerOrUndefined = CodeMirror.TextMarker | undefined
let markers: MarkerOrUndefined[] = []

export function MarkdownEditor() {
  const currentPath = useReadCurrentPath()
  const { file, error: readError } = useReadFile()
  const [updateFile] = useUpdateFile()
  const { setEasyMDE, markText, posFromIndex } = useEasyMDE()

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

      const startPosition = posFromIndex(startOffset)
      const endPosition = posFromIndex(endOffset)

      if (!startPosition || !endPosition) {
        return
      }

      const marker = markText?.(
        { line: startPosition.line, ch: startPosition.ch },
        { line: endPosition.line, ch: endPosition.ch },
        { css: 'color: pink' }
      )

      markers = [...markers, marker]
    })
  }, [nodes, markText, posFromIndex, file?.readAt])

  if (readError) {
    alert('Could not read file. Please try again.')
  }

  async function handleUpdateFile(value: string) {
    // Clear markers
    if (markers.length > 0) {
      markers.forEach((marker) => marker?.clear())

      markers = []
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

  return (
    <Style aria-label="Markdown editor">
      <SimpleMDE
        key={file?.path}
        className="MarkdownEditor-wrapper"
        onChange={handleUpdateFile}
        value={file?.content ?? ''}
        getLineAndCursor={handleSetMarkdownCursorPosition}
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
    </Style>
  )
}
