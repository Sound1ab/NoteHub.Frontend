import { Editor, Element, Path, Transforms } from 'slate'

import { ListElement } from '../../../SlateTypes'
import { getCurrentItem } from '../../helpers/list/getCurrentItem'
import { getItemDepth } from '../../helpers/list/getItemDepth'

/**
 * Decreases the depth of the current item. The following items will
 * be moved as sublist of the decreased item.
 *
 * No-op for root items.
 */
export const decreaseItemDepth = (editor: Editor, path?: Path) => {
  if (getItemDepth(editor, path) === 1) return

  const currentItemTuple = getCurrentItem(editor, path)

  if (!currentItemTuple) return

  const [currentItem, currentItemPath] = currentItemTuple

  if (!Path.isPath(currentItemPath) || !Element.isElement(currentItem)) return

  const [currentList, currentListPath] = Editor.parent(editor, currentItemPath)
  const parentItemPath = Path.parent(currentListPath)
  const parentListPath = Path.parent(parentItemPath)
  const followingItems = currentList.children.slice(
    Path.relative(currentItemPath, currentListPath)[0] + 1
  )

  const currentListPathRef = Editor.pathRef(editor, currentListPath)

  Editor.withoutNormalizing(editor, () => {
    if (followingItems.length > 0) {
      if (!currentList || !Element.isElement(currentList)) return

      const newList = {
        type: currentList.type,
        children: followingItems,
      }

      Transforms.removeNodes(editor, {
        at: currentListPath,
        match: (n) => Element.isElement(n) && followingItems.includes(n),
      })

      Transforms.insertNodes(editor, newList as unknown as ListElement, {
        at: currentItemPath.concat([currentItem.children.length]),
      })

      Transforms.moveNodes(editor, {
        at: currentItemPath,
        to: parentListPath.concat([
          Path.relative(parentItemPath, parentListPath)[0] + 1,
        ]),
      })
    } else {
      Transforms.moveNodes(editor, {
        at: currentItemPath,
        to: parentListPath.concat([
          Path.relative(parentItemPath, parentListPath)[0] + 1,
        ]),
      })
    }

    if (!currentListPathRef.current) throw new Error('decreaseItemDepth')

    const currentListChildren = Editor.node(
      editor,
      currentListPathRef.current
    )[0]

    const hasCurrentListChildren =
      Element.isElement(currentListChildren) &&
      currentListChildren.children.length > 0

    if (!hasCurrentListChildren) {
      Transforms.removeNodes(editor, {
        at: currentListPathRef.current,
      })
    }

    const parentItemBlocks = Editor.node(editor, parentItemPath)[0]

    const hasParentItemBlocks =
      Element.isElement(parentItemBlocks) &&
      parentItemBlocks.children.some((node) => Editor.isBlock(editor, node))

    if (!hasParentItemBlocks) {
      Transforms.removeNodes(editor, {
        at: parentItemPath,
      })
    }
  })

  currentListPathRef.unref()
}
