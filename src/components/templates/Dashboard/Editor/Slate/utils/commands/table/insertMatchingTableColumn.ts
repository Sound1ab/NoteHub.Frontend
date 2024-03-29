import { Ancestor, Editor, Element, Node, NodeEntry, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export function insertTableColumn(editor: Editor, node: Node) {
  const path = ReactEditor.findPath(editor, node)

  const headerCellPosition = path[2]

  // Use ancestors of cell to find table. This will allow us to find all the rows
  // so we can add a cell to each one
  const ancestors = Node.ancestors(editor, path, { reverse: true })

  let table: NodeEntry<Ancestor> | null = null

  for (const nodeEntry of ancestors) {
    const [node] = nodeEntry

    if (!Element.isElement(node)) continue

    if (node.type !== 'table') continue

    table = nodeEntry
  }

  if (!table) return

  // Use the table to find all the rows
  const tableRows = Node.children(editor, table[1])

  // Iterate over each row and insert the new cell.
  // Uses the table and row position of the tableRow node
  // Uses the cell position of the header node
  for (const tableRow of tableRows) {
    // Grabs the table row Path then the table row position within the path
    const header = tableRow[1][1] === 0

    Transforms.insertNodes(
      editor,
      {
        type: 'tableCell',
        header,
        children: [
          { text: 'Content', bold: false, italic: false, inlineCode: false },
        ],
      },
      {
        at: [...tableRow[1], headerCellPosition],
        mode: 'lowest',
      }
    )
  }
}
