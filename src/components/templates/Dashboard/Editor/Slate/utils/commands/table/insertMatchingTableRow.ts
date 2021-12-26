import { Editor, Element, Node } from 'slate'
import { ReactEditor } from 'slate-react'

import { insertTableRow } from './insertTableRow'

export function insertMatchingTableRow(editor: Editor, node: Node) {
  const path = ReactEditor.findPath(editor, node)

  // Create cells that make up a row
  const cells =
    Element.isElement(node) &&
    node.children.map(() => ({
      type: 'tableCell' as const,
      header: false,
      children: [
        { text: 'Content', bold: false, italic: false, inlineCode: false },
      ],
    }))

  if (!cells) return

  // Insert row one leaf after the selected row
  insertTableRow({ editor, children: cells, at: [path[0], path[1] + 1] })
}
