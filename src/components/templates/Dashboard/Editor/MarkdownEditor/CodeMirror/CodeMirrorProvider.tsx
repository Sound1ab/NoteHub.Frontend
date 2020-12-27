import CodeMirror from 'codemirror'
import React, {
  Dispatch,
  ReactNode,
  Ref,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react'

import { useReadFile } from '../../../../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../../../../hooks/file/useUpdateFile'
import { useReadActiveRetextSettings } from '../../../../../../hooks/localState/useReadActiveRetextSettings'
import { useReadIsPreviewActive } from '../../../../../../hooks/localState/useReadIsPreviewActive'
import { useReadIsSideBySideActive } from '../../../../../../hooks/localState/useReadIsSideBySideActive'
import useDeepCompareEffect from '../../../../../../hooks/utils/useDeepCompareEffect'
import { useModalToggle } from '../../../../../../hooks/utils/useModalToggle'
import { process } from '../../../../../../services/retext/process'
import { IMessage, IPosition } from '../../../../../../types'
import { isNumber } from '../../../../../../utils/typeGuards/isNumber'
import { ErrorToast } from '../../../../../atoms/Toast/Toast'
import { localState } from '../../../../../providers/ApolloProvider/cache'
import { IActions } from './CodeMirror'

interface ICodeMirrorProvider {
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
  setActions: Dispatch<SetStateAction<IActions | undefined>>
  actions: IActions
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
  onRefresh: () => void
  scrollRef: Ref<HTMLDivElement>
}

export const CodeMirrorContext = React.createContext<Partial<ContextProps>>({})

export function CodeMirrorProvider({ children }: ICodeMirrorProvider) {
  const [actions, setActions] = useState<IActions | undefined>(undefined)
  const isSideBySideActive = useReadIsSideBySideActive()
  const isPreviewActive = useReadIsPreviewActive()
  const [updateFile, { loading }] = useUpdateFile()
  const [markers, setMarkers] = useState<IMarker[]>([])
  const [activeWidget, setActiveWidget] = useState<IActiveWidget | null>(null)
  const { isOpen: isWidgetOpen, setOpen: setIsWidgetOpen } = useModalToggle()
  const { file, error: readError } = useReadFile()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { activeRetextSettings } = useReadActiveRetextSettings()

  if (readError) {
    ErrorToast(`Could not read file. Please try again.`)
  }

  function toggleSideBySide() {
    if (!isSideBySideActive) {
      localState.isPreviewActiveVar(false)
    }
    localState.isSideBySideActiveVar(!isSideBySideActive)
    handleRefresh()
  }

  function togglePreview() {
    if (!isPreviewActive) {
      localState.isSideBySideActiveVar(false)
    }
    localState.isPreviewActiveVar(!isPreviewActive)
    handleRefresh()
  }

  const clearMarkers = useCallback(() => {
    setIsWidgetOpen(false)

    setMarkers((markers) => {
      markers.forEach((marker: IMarker) => marker.marker?.clear?.())
      return []
    })
  }, [setIsWidgetOpen])

  const createMarkers = useCallback(
    (messages: IMessage[]) => {
      messages.forEach((message) => {
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
        const startPosition = actions?.editor?.posFromIndex(startOffset)
        const endPosition = actions?.editor?.posFromIndex(endOffset)

        if (!startPosition || !endPosition) {
          return
        }

        // Mark it
        const marker = actions?.editor?.markText?.(
          { line: startPosition.line, ch: startPosition.ch },
          { line: endPosition.line, ch: endPosition.ch },
          {
            css: `text-decoration: underline; text-decoration-color: var(--accent-primary); text-decoration-style: wavy`,
          }
        )

        if (!marker) {
          return
        }

        // Get the absolute position of the marker based on the text area
        const coords = actions?.editor?.charCoords(
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
    },
    [actions?.editor]
  )

  useDeepCompareEffect(() => {
    if (!activeRetextSettings || !file?.content) {
      return
    }

    if (activeRetextSettings.length === 0) {
      clearMarkers()
      return
    }

    process(file?.content, activeRetextSettings).then((result) => {
      clearMarkers()
      createMarkers(result)
    })
  }, [activeRetextSettings, createMarkers, file?.content, clearMarkers])

  async function handleUpdateFile(value: string) {
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
    const lineCh = actions?.editor?.coordsChar(
      { left: e.clientX, top: e.clientY },
      'page'
    )

    if (!lineCh) {
      return
    }

    // Check the editor to see if there is a marker at that position
    const selectedMarkers = actions?.editor?.findMarksAt(lineCh)

    // If there is no marker there hide widget
    if (!selectedMarkers || selectedMarkers.length === 0) {
      setIsWidgetOpen(false)
      return
    }

    // Get the absolute position of the marker based on the text area
    const coords = actions?.editor?.charCoords(
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
        top: coords.top - (scrollRef.current?.scrollTop ?? 0) + 10,
      },
      message: activeMarker.options.message,
    })
    setIsWidgetOpen(true)
  }

  function handleRemoveWidget() {
    if (!isWidgetOpen) {
      return
    }
    setIsWidgetOpen(false)
  }

  function handleRefresh() {
    setTimeout(() => {
      actions?.editor?.setOption('viewportMargin', Infinity)
      actions?.editor?.refresh()
    }, 1)
  }

  return (
    <CodeMirrorContext.Provider
      value={{
        setActions,
        actions,
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
        onRemoveWidget: handleRemoveWidget,
        scrollRef,
        onRefresh: handleRefresh,
      }}
    >
      {children}
    </CodeMirrorContext.Provider>
  )
}
