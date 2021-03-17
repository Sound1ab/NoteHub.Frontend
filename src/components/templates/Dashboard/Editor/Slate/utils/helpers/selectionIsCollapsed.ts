import { Editor, Range } from 'slate'

export function selectionIsCollapsed(editor: Editor) {
  const selection = editor.selection

  if (!selection) {
    throw new Error('Selection is null')
  }

  return Range.isCollapsed(selection)
}
