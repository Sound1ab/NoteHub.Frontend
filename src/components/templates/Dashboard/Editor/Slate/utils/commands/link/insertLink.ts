import { Editor, Range, Transforms } from 'slate'

export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' })
}

const wrapLink = (editor: Editor, url: string, selection: Range) => {
  const link = {
    type: 'link',
    url,
    children: [],
  }
  const isCollapsed = Range.isCollapsed(selection)

  if (isCollapsed) return

  Transforms.wrapNodes(editor, link, {
    split: true,
    at: selection,
  })
}

interface IInsertLink {
  editor: Editor
  selection: Range
  url: string
}

export const insertLink = ({ editor, selection, url }: IInsertLink) => {
  if (!selection || Range.isCollapsed(selection)) return

  wrapLink(editor, url, selection)
}
