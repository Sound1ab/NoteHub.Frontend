import CodeMirror from 'codemirror'
import EasyMDE from 'easymde'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import {
  useModalToggle,
  useReadFile,
  useReadIsPreviewActive,
  useReadIsSideBySideActive,
  useUpdateFile,
} from '../../../hooks'
import { IPosition } from '../../../types'
import { isNumber } from '../../../utils'
import { File, MessagesFragment } from '../../apollo'
import { ErrorToast } from '../../atoms'
import { localState } from '../ApolloProvider/cache'

interface IEasyMDEProvider {
  children?: ReactNode
}

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

type ContextProps = {
  editor: EasyMDE
  setEasyMDE: Dispatch<SetStateAction<EasyMDE | undefined>>
  codemirror: CodeMirror.Editor
  easyMDE: typeof EasyMDE
  toggleSideBySide: () => void
  togglePreview: () => void
  isSideBySideActive: boolean
  isPreviewActive: boolean
  loading: boolean
  isWidgetOpen: boolean
  activeWidget: IActiveWidget | null
  onUpdateFile: (value: string) => Promise<void>
  onMarkdownCursorPosition: (currentCursorPosition: IPosition) => void
  onEditorClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onRemoveWidget: () => void
  file: File | null
}

export const EasyMDEContext = React.createContext<Partial<ContextProps>>({})

export function EasyMDEProvider({ children }: IEasyMDEProvider) {
  const [easyMDE, setEasyMDE] = useState<EasyMDE | undefined>(undefined)
  const isSideBySideActive = useReadIsSideBySideActive()
  const isPreviewActive = useReadIsPreviewActive()
  const EasyMDEConstructor = easyMDE?.constructor as typeof EasyMDE
  const [updateFile, { loading }] = useUpdateFile()
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [activeWidget, setActiveWidget] = useState<IActiveWidget | null>(null)
  const { isOpen: isWidgetOpen, setOpen: setIsWidgetOpen } = useModalToggle()
  const { file, error: readError } = useReadFile()

  function ignoreErrorFromFn(fn: () => void) {
    try {
      fn()
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!easyMDE) {
      return
    }

    if (isSideBySideActive && !easyMDE.isSideBySideActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.toggleSideBySide(easyMDE))
    } else if (!isSideBySideActive && easyMDE.isSideBySideActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.toggleSideBySide(easyMDE))
    }
    if (isPreviewActive && !easyMDE?.isPreviewActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.togglePreview(easyMDE))
    } else if (!isPreviewActive && easyMDE?.isPreviewActive()) {
      ignoreErrorFromFn(() => EasyMDEConstructor?.togglePreview(easyMDE))
    }
  }, [EasyMDEConstructor, isSideBySideActive, isPreviewActive, easyMDE])

  function toggleSideBySide() {
    if (!isSideBySideActive) {
      localState.isPreviewActiveVar(false)
    }
    localState.isSideBySideActiveVar(!isSideBySideActive)
  }

  function togglePreview() {
    if (!isPreviewActive) {
      localState.isSideBySideActiveVar(false)
    }
    localState.isPreviewActiveVar(!isPreviewActive)
  }

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
      const startPosition = easyMDE?.codemirror.posFromIndex(startOffset)
      const endPosition = easyMDE?.codemirror.posFromIndex(endOffset)

      if (!startPosition || !endPosition) {
        return
      }

      // Mark it
      const marker = easyMDE?.codemirror.markText?.(
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
      const coords = easyMDE?.codemirror.charCoords(
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
  }, [nodes, file?.readAt, easyMDE?.codemirror])

  if (readError) {
    ErrorToast(`Could not read file. Please try again.`)
  }

  async function handleUpdateFile(value: string) {
    // Clear markers
    if (markers.length > 0) {
      setIsWidgetOpen(false)
      markers.forEach((marker) => marker.marker?.clear?.())
      setMarkers([])
    }

    try {
      await updateFile(file, value)
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

  function handleEditorClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    // Get line and character given the position of the mouse in the editor
    const lineCh = easyMDE?.codemirror.coordsChar(
      { left: e.clientX, top: e.clientY },
      'page'
    )

    if (!lineCh) {
      return
    }

    // Check the editor to see if there is a marker at that position
    const selectedMarkers = easyMDE?.codemirror.findMarksAt(lineCh)

    // If there is no marker there hide widget
    if (!selectedMarkers || selectedMarkers.length === 0) {
      setIsWidgetOpen(false)
      return
    }

    // Get the absolute position of the marker based on the text area
    const coords = easyMDE?.codemirror.charCoords(
      { line: lineCh.line, ch: lineCh.ch },
      'local'
    )

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
        top: coords.top - (easyMDE?.codemirror.getScrollInfo()?.top ?? 0),
      },
      message: activeMarker.options.message,
    })
    setIsWidgetOpen(true)
  }

  return (
    <EasyMDEContext.Provider
      value={{
        editor: easyMDE,
        setEasyMDE,
        codemirror: easyMDE?.codemirror,
        easyMDE: EasyMDEConstructor,
        toggleSideBySide,
        togglePreview,
        isPreviewActive,
        isSideBySideActive,
        loading,
        isWidgetOpen,
        activeWidget,
        onUpdateFile: handleUpdateFile,
        onMarkdownCursorPosition: handleSetMarkdownCursorPosition,
        onEditorClick: handleEditorClick,
        onRemoveWidget: () => setIsWidgetOpen(false),
        file,
      }}
    >
      {children}
    </EasyMDEContext.Provider>
  )
}
