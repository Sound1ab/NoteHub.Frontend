import CodeMirror, { Editor } from 'codemirror'
import { useCallback, useState } from 'react'

import { localState } from '../../components/providers/ApolloProvider/cache'
import { IMessage, IPosition } from '../../types'
import { isNumber } from '../../utils/typeGuards/isNumber'
import { useWidget } from '../recoil/useWidget'
import {
  _drawHorizontalRule,
  _drawLink,
  _drawTable,
  _toggleBlockquote,
  _toggleBold,
  _toggleCodeBlock,
  _toggleItalic,
  _toggleOrderedList,
  _toggleUnorderedList,
} from './actions'

export function useCodeMirror() {
  const [widget, setWidget] = useWidget()
  const [markers, setMarkers] = useState<IMarker[]>([])

  const clearMarkers = useCallback(() => {
    setWidget(null)

    setMarkers((markers) => {
      markers.forEach((marker: IMarker) => marker.marker?.clear?.())
      return []
    })
  }, [setWidget])

  const createMarkers = useCallback((editor: Editor, messages: IMessage[]) => {
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
      const startPosition = editor.posFromIndex(startOffset)
      const endPosition = editor.posFromIndex(endOffset)

      if (!startPosition || !endPosition) {
        return
      }

      // Mark it
      const marker = editor.markText?.(
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
      const coords = editor.charCoords(
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
  }, [])

  function setCursorPosition(currentCursorPosition: IPosition) {
    localState.cursorPositionVar({
      ...currentCursorPosition,
      __typename: 'Position',
    })
  }

  const displayWidget = useCallback(
    (
      editor: Editor,
      { clientX, clientY }: { clientX: number; clientY: number },
      scrollTop: number
    ) => {
      // Get line and character given the position of the mouse in the editor
      const lineCh = editor.coordsChar({ left: clientX, top: clientY }, 'page')

      if (!lineCh) {
        return
      }

      // Check the editor to see if there is a marker at that position
      const selectedMarkers = editor.findMarksAt(lineCh)

      // If there is no marker there hide widget
      if (!selectedMarkers || selectedMarkers.length === 0) {
        setWidget(null)
        return
      }

      // Get the absolute position of the marker based on the text area
      const coords = editor.charCoords(
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
      setWidget({
        coords: {
          ...coords,
          left: coords.left,
          top: coords.top - scrollTop + 10,
        },
        message: activeMarker.options.message,
      })
    },
    [markers, setWidget]
  )

  const removeWidget = useCallback(() => {
    if (!widget) {
      return
    }

    setWidget(null)
  }, [widget, setWidget])

  const refreshEditor = useCallback((editor: Editor) => {
    setTimeout(() => {
      editor.setOption('viewportMargin', Infinity)
      editor.refresh()
    }, 1)
  }, [])

  const toggleOrderedList = useCallback(
    (editor: Editor) => _toggleOrderedList(editor),
    []
  )

  const toggleUnorderedList = useCallback(
    (editor: Editor) => _toggleUnorderedList(editor),
    []
  )

  const toggleCodeBlock = useCallback(
    (editor: Editor) => _toggleCodeBlock(editor),
    []
  )

  const toggleItalic = useCallback(
    (editor: Editor) => _toggleItalic(editor),
    []
  )

  const toggleBold = useCallback((editor: Editor) => _toggleBold(editor), [])

  const toggleBlockquote = useCallback(
    (editor: Editor) => _toggleBlockquote(editor),
    []
  )

  const drawHorizontalRule = useCallback(
    (editor: Editor) => _drawHorizontalRule(editor),
    []
  )

  const drawLink = useCallback((editor: Editor) => _drawLink(editor), [])

  const drawTable = useCallback((editor: Editor) => _drawTable(editor), [])

  return [
    {
      refreshEditor,
      removeWidget,
      displayWidget,
      setCursorPosition,
      createMarkers,
      clearMarkers,
      toggleOrderedList,
      toggleCodeBlock,
      toggleUnorderedList,
      toggleItalic,
      toggleBold,
      toggleBlockquote,
      drawHorizontalRule,
      drawLink,
      drawTable,
    },
  ]
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
