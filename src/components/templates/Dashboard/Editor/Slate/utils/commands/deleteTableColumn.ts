import { Ancestor, Node, NodeEntry, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export function deleteTableColumn(editor: ReactEditor, node: Node) {
  const path = ReactEditor.findPath(editor, node)

  const headerCellPosition = path[2]

  // Use ancestors of cell to find table. This will allow us to find all the rows
  // so we can add a cell to each one
  const ancestors = Node.ancestors(editor, path, { reverse: true })

  let table: NodeEntry<Ancestor> | null = null

  for (const node of ancestors) {
    const [{ type }] = node

    if (type !== 'table') continue

    table = node
  }

  if (!table) return

  // Use the table to find all the rows
  const tableRows = Node.children(editor, table[1])

  const tableCells = Array.from(Node.children(editor, table[1]))[0][0].children

  if (Array.isArray(tableCells) && tableCells.length === 1) {
    Transforms.removeNodes(editor, { at: table[1] })
    return
  }

  // Iterate over each row and delete the cell.
  // Uses the table and row position of the tableRow node
  // Uses the cell position of the header node
  for (const tableRow of tableRows) {
    Transforms.removeNodes(editor, {
      at: [...tableRow[1], headerCellPosition],
    })
  }

  const point = { path: [0, 0], offset: 0 }
  editor.selection = { anchor: point, focus: point }
}
