import { Editor, Text } from 'slate'

export function isInlineActive(
  editor: Editor,
  inlineStyle: 'bold' | 'inlineCode' | 'italic'
) {
  const [match] = Editor.nodes(editor, {
    match: (n) => Text.isText(n) && n[inlineStyle],
    universal: true,
  })

  return !!match
}
