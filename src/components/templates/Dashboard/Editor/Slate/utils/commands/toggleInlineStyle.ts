import { Editor, Text, Transforms } from 'slate'

import { isInlineActive } from '../helpers/isInlineActive'

export function toggleInlineStyle(
  editor: Editor,
  inlineStyle: 'bold' | 'inlineCode' | 'italic'
) {
  const isActive = isInlineActive(editor, inlineStyle)
  Transforms.setNodes(
    editor,
    { [inlineStyle]: isActive ? null : true },
    { match: (n) => Text.isText(n), split: true }
  )
}
