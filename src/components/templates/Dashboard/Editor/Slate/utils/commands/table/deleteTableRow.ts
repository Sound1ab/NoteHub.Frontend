import { Ancestor, Editor, Element, Node, NodeEntry, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export function deleteTableRow(editor: Editor, node: Node) {
  const path = ReactEditor.findPath(editor, node)

  // Use ancestors of cell to find table. This will allow us to delete it
  // if we remove all rows
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
  const tableRows = Array.from(Node.children(editor, table[1]))

  if (Array.isArray(tableRows) && tableRows.length === 2) {
    Transforms.removeNodes(editor, { at: table[1] })
    return
  }

  Transforms.removeNodes(editor, {
    at: path,
  })
}
