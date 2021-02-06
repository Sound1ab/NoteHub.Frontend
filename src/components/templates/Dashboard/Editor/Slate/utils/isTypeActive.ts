import { Editor } from 'slate'

export function isTypeActive(editor: Editor, type: 'code' | 'blockquote') {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === type,
  })

  return !!match
}
