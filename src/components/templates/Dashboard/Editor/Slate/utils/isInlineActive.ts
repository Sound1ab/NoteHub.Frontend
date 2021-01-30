import { Editor } from 'slate'

export function isInlineActive(
  editor: Editor,
  inlineStyle: 'bold' | 'code' | 'italic'
) {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[inlineStyle] === true,
    universal: true,
  })

  return !!match
}
