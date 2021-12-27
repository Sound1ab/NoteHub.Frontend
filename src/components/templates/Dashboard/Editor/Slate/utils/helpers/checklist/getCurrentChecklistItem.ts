import { Editor, Element, Node, NodeEntry, Path } from 'slate'

/**
 * Return the current list item, from current selection or from a node.
 */
export const getCurrentChecklistItem = (
  editor: Editor,
  path?: Path
): NodeEntry<Element | Node> | null => {
  if (!path) {
    if (!editor.selection) return null

    const [, foundPath] = Editor.first(editor, editor.selection)

    path = foundPath
  }

  const nodeOnPath = Node.get(editor, path)
  if (nodeOnPath && Element.isElementType(nodeOnPath, 'checklistItem')) {
    return [nodeOnPath, path]
  }

  return (
    Editor.above(editor, {
      at: path,
      match: (node: Node) => Element.isElementType(node, 'checklistItem'),
      mode: 'lowest',
    }) || null
  )
}
