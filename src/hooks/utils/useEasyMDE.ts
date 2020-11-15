import { CoordsMode } from 'codemirror'
import CodeMirror from 'codemirror'
import EasyMDE from 'easymde'
import { useCallback, useContext } from 'react'

import { EasyMDEContext } from '../../components/providers'

export function useEasyMDE() {
  const context = useContext(EasyMDEContext)

  function runIfEditor(fn?: (editor: EasyMDE) => void) {
    return () => {
      if (!context.editor) {
        return
      }
      fn?.(context.editor)
    }
  }

  const markText = useCallback(
    (
      ...args: [
        CodeMirror.Position,
        CodeMirror.Position,
        CodeMirror.TextMarkerOptions
      ]
    ) => context.editor?.codemirror.markText(...args),
    [context.editor]
  )

  const posFromIndex = useCallback(
    (index: number) => context.editor?.codemirror.posFromIndex(index),
    [context.editor]
  )

  const charCoords = useCallback(
    (...args: [CodeMirror.Position, CoordsMode]) =>
      context.editor?.codemirror.charCoords(...args),
    [context.editor]
  )

  const coordsChar = useCallback(
    (...args: [{ left: number; top: number }, CoordsMode]) =>
      context.editor?.codemirror.coordsChar(...args),
    [context.editor]
  )

  const cursorCoords = useCallback(
    (...args: [CodeMirror.Position, CoordsMode]) =>
      context.editor?.codemirror.cursorCoords(...args),
    [context.editor]
  )

  const findMarksAt = useCallback(
    (...args: [CodeMirror.Position]) =>
      context.editor?.codemirror.findMarksAt(...args),
    [context.editor]
  )

  const getScrollInfo = useCallback(
    () => context.editor?.codemirror.getScrollInfo(),
    [context.editor]
  )

  const heightAtLine = useCallback(
    (line: number, mode: CoordsMode) =>
      context.editor?.codemirror.heightAtLine(line, mode),
    [context.editor]
  )

  return {
    heightAtLine,
    getScrollInfo,
    cursorCoords,
    findMarksAt,
    coordsChar,
    charCoords,
    markText,
    posFromIndex,
    toggleBlockquote: runIfEditor(context.EasyMDE?.toggleBlockquote),
    drawHorizontalRule: runIfEditor(context.EasyMDE?.drawHorizontalRule),
    cleanBlock: runIfEditor(context.EasyMDE?.cleanBlock),
    toggleBold: runIfEditor(context.EasyMDE?.toggleBold),
    toggleHeadingBigger: runIfEditor(context.EasyMDE?.toggleHeadingBigger),
    toggleItalic: runIfEditor(context.EasyMDE?.toggleItalic),
    togglePreview: runIfEditor(context.EasyMDE?.togglePreview),
    toggleCodeBlock: runIfEditor(context.EasyMDE?.toggleCodeBlock),
    toggleUnorderedList: runIfEditor(context.EasyMDE?.toggleUnorderedList),
    toggleOrderedList: runIfEditor(context.EasyMDE?.toggleOrderedList),
    drawLink: runIfEditor(context.EasyMDE?.drawLink),
    drawTable: runIfEditor(context.EasyMDE?.drawTable),
    undo: runIfEditor(context.EasyMDE?.undo),
    redo: runIfEditor(context.EasyMDE?.redo),
    toggleSideBySide: runIfEditor(context.EasyMDE?.toggleSideBySide),
    setEasyMDE: context.setEasyMDE,
  }
}
