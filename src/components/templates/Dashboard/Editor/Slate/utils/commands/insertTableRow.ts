import { Element, Node, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export function insertTableRow(editor: ReactEditor, node: Node) {
  const path = ReactEditor.findPath(editor, node)

  // Create cells that make up a row
  const cells =
    Element.isElement(node) &&
    node.children.map(() => ({
      type: 'tableCell',
      children: [{ text: 'Content' }],
    }))

  if (!cells) return

  // Insert row one leaf after the selected row
  Transforms.insertNodes(
    editor,
    {
      type: 'tableRow',
      header: undefined,
      footer: undefined,
      children: cells,
    },
    {
      at: [path[0], path[1] + 1],
    }
  )
}
