import { Editor, Transforms } from 'slate'

interface IInsertTableCell {
  editor: Editor
  header?: boolean
  at: number[]
}

export function insertTableCell({
  editor,
  header = false,
  at,
}: IInsertTableCell) {
  Transforms.insertNodes(
    editor,
    {
      type: 'tableCell',
      header,
      children: [{ text: '', bold: false, italic: false, inlineCode: false }],
    },
    {
      at,
    }
  )
}
