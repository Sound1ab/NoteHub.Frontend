import { Editor, Element, Node, NodeEntry, Path, Transforms } from 'slate'

import { isList } from '../../helpers/list/isList'

/**
 * A rule that joins adjacent lists of the same type
 */
export function joinAdjacentLists(editor: Editor): void {
  const { normalizeNode } = editor

  editor.normalizeNode = (entry: NodeEntry): void => {
    const [node, nodePath] = entry

    if (!Element.isElement(node)) return

    if (isList(node)) {
      let previousSiblingNodePath: Path
      try {
        previousSiblingNodePath = Path.previous(nodePath)
      } catch (e) {
        // the node doesn't have a previous sibling (ie. first)
        normalizeNode(entry)

        return
      }

      const previousSiblingNode = Node.get(editor, previousSiblingNodePath)

      if (!previousSiblingNode || !Element.isElement(previousSiblingNode))
        return

      const canMerge = (nodeA: Node, nodeB: Node) =>
        nodeA.type === 'list' && nodeB.type === 'list'

      if (isList(previousSiblingNode) && canMerge(node, previousSiblingNode)) {
        const targetNodeLastChildIndex = previousSiblingNode.children.length - 1

        Editor.withoutNormalizing(editor, () => {
          const targetNodePath = [
            ...previousSiblingNodePath,
            // as the new last child of previous sibling list
            targetNodeLastChildIndex + 1,
          ]

          Transforms.insertNodes(editor, node.children, {
            at: targetNodePath,
          })

          Transforms.removeNodes(editor, {
            at: nodePath,
          })
        })
        return
      }
    }

    normalizeNode(entry)
  }
}
