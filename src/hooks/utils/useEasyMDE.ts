import EasyMDE from 'easymde'
import { useContext } from 'react'

import { EasyMDEContext } from '../../components/providers'

export function useEasyMDE() {
  const context = useContext(EasyMDEContext)

  function runIfEditor(fn?: (editor: EasyMDE) => void) {
    return () => {
      if (!context.editor) {
        return
      }
      fn && fn(context.editor)
    }
  }

  return {
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
