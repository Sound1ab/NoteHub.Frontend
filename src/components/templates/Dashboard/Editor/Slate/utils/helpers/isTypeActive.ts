import { Editor, Element } from 'slate'

export function isTypeActive(
  editor: Editor,
  type: 'code' | 'blockquote' | 'link'
) {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === type,
  })

  return !!match
}
