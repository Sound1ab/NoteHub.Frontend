import { Editor, Node, Range, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export const isSelectionLink = (editor: Editor, selection: Range) => {
  return Node.parent(editor, selection.focus.path).type === 'link'
}

export const unwrapLink = (editor: ReactEditor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' })
}

const wrapLink = (
  editor: ReactEditor,
  url: string,
  text: string,
  selection: Range
) => {
  const link = {
    type: 'link',
    link: url,
    children: text ? [{ text }] : [{ text: url }],
  }
  const isCollapsed = Range.isCollapsed(selection)

  if (isCollapsed && isSelectionLink(editor, selection)) {
    const linkNodePath = ReactEditor.findPath(
      editor,
      Node.parent(editor, selection.focus.path)
    )

    if (text !== Editor.string(editor, linkNodePath)) {
      Transforms.insertText(editor, text, { at: linkNodePath })
    }

    Transforms.select(editor, linkNodePath)

    unwrapLink(editor)

    Transforms.wrapNodes(editor, link, { split: true })

    return
  }
  if (isCollapsed) {
    Transforms.insertNodes(editor, link)

    return
  }
  unwrapLink(editor)

  Transforms.wrapNodes(editor, link, { split: true })
}

export const insertLink = (editor: ReactEditor, url: string, text: string) => {
  const selection = editor.selection

  if (!selection) return

  wrapLink(editor, url, text, selection)
}
