import { Editor, Text, Transforms } from 'slate'

import { isInlineActive } from './isInlineActive'

export function toggleInlineStyle(
  editor: Editor,
  inlineStyle: 'bold' | 'code' | 'italic'
) {
  const isActive = isInlineActive(editor, inlineStyle)
  Transforms.setNodes(
    editor,
    { [inlineStyle]: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  )
}
