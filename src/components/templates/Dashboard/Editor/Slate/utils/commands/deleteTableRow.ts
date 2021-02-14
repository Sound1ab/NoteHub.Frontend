import { Node, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'

export function deleteTableRow(editor: ReactEditor, node: Node) {
  const path = ReactEditor.findPath(editor, node)

  Transforms.removeNodes(editor, {
    at: path,
  })
}
