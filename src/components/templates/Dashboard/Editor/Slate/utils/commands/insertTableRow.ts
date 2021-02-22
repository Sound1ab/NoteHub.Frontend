import { Editor, Node, Transforms } from 'slate'

interface IInsertTableRow {
  editor: Editor
  header?: boolean
  at: number[]
  children?: Node[]
}

export function insertTableRow({
  editor,
  header = false,
  at,
  children = [],
}: IInsertTableRow) {
  Transforms.insertNodes(
    editor,
    { type: 'tableRow', header, children },
    {
      at,
    }
  )
}
