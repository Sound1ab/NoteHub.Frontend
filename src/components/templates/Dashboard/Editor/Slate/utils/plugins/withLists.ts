import {
  Editor,
  Element,
  Node,
  NodeEntry,
  Path,
  Point,
  Range,
  Transforms,
} from 'slate'

import { CustomElement } from '../../SlateTypes'
import { isList } from '../helpers/list/isList'

export function withLists(editor: Editor) {
  const { normalizeNode, deleteBackward } = editor

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

      const canMerge = (nodeA: CustomElement, nodeB: CustomElement) =>
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

  editor.deleteBackward = (...args) => {
    const { selection } = editor

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      })

      if (match) {
        const [block, path] = match
        const start = Editor.start(editor, path)

        if (
          !Editor.isEditor(block) &&
          Element.isElement(block) &&
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          const newProperties: Partial<Element> = {
            type: 'paragraph',
          }
          Transforms.setNodes(editor, newProperties)

          if (block.type === 'listItem') {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                !Editor.isEditor(n) &&
                Element.isElement(n) &&
                n.type === 'list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  }
  return editor
}
