import { Editor, Transforms } from 'slate'

import { TableCellElement } from '../../../SlateTypes'

interface IInsertTableRow {
  editor: Editor
  header?: boolean
  at: number[]
  children?: TableCellElement[]
}

export function insertTableRow({
  editor,
  header = false,
  at,
  children = [],
}: IInsertTableRow) {
  Transforms.insertNodes(
    editor,
    { type: 'tableRow', header, children, footer: false },
    {
      at,
    }
  )
}
