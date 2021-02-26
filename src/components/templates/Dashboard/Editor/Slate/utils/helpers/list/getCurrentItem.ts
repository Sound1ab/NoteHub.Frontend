import { Editor, Element, Node, NodeEntry, Path } from 'slate'

import { isItem } from './isItem'

// import { type, Options } from '..'
// import { isItem } from '.'

/**
 * Return the current list item, from current selection or from a node.
 */
export const getCurrentItem = (
  editor: Editor,
  path?: Path
): NodeEntry<Element | Node> | null => {
  if (!path) {
    if (!editor.selection) return null

    const [, foundPath] = Editor.first(editor, editor.selection)

    path = foundPath
  }

  const nodeOnPath = Node.get(editor, path)
  if (nodeOnPath && isItem(nodeOnPath)) {
    return [nodeOnPath, path]
  }

  return (
    Editor.above(editor, {
      at: path,
      match: (node: Node) => isItem(node),
      mode: 'lowest',
    }) || null
  )
}
