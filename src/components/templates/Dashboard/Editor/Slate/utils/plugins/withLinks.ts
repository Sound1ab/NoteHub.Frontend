import { Editor } from 'slate'

export function withLinks(editor: Editor) {
  const { isInline } = editor

  editor.isInline = (element) =>
    element.type === 'link' ? true : isInline(element)

  return editor
}
