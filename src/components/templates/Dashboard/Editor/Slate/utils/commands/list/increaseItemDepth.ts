import { Editor, Element, NodeEntry, Path, Transforms } from 'slate'

import { ListElement } from '../../../SlateTypes'
import { getCurrentItem } from '../../helpers/list/getCurrentItem'
import { getDeepestItemDepth } from '../../helpers/list/getDeepestItemDepth'
import { getListForItem } from '../../helpers/list/getListForItem'
import { getPreviousItem } from '../../helpers/list/getPreviousItem'
import { isList } from '../../helpers/list/isList'

/**
 * Move the given item to the sublist at the end of destination item,
 * creating a sublist if needed.
 */
const moveAsSubItem = (
  editor: Editor,
  movedItemEntry: NodeEntry<Element>,
  destinationEntry: NodeEntry<Element>
): void => {
  const [movedItemElement, movedItemElementPath] = movedItemEntry
  const [destinationElement, destinationElementPath] = destinationEntry
  const lastIndex = destinationElement.children.length
  const lastChildIndex = destinationElement.children.length - 1
  const lastChild = destinationElement.children[lastIndex - 1]

  // The potential existing last child list
  const existingList = isList(lastChild) ? lastChild : null
  if (existingList && Element.isElement(lastChild)) {
    Transforms.moveNodes(editor, {
      at: movedItemElementPath,
      // At the destination, the last Element is a List
      // we want to add the current Item
      // as the new last Item of that List
      to: [
        ...destinationElementPath,
        lastChildIndex,
        lastChild.children.length,
      ],
    })

    return
  }

  const item = getListForItem(editor, destinationElementPath)

  if (!item) return

  const [currentList] = item

  if (!currentList || !Element.isElement(currentList)) return

  const newSublist = {
    type: currentList.type,
    children: [movedItemElement],
  }

  Editor.withoutNormalizing(editor, () => {
    // Insert new sublist after the position
    // of the last child of the destination node
    Transforms.insertNodes<ListElement>(
      editor,
      newSublist as unknown as ListElement,
      {
        at: [...destinationElementPath, lastChildIndex + 1],
      }
    )

    Transforms.removeNodes(editor, {
      at: movedItemElementPath,
    })
  })
}

/**
 * Increase the depth of the current item by putting it in a sub-list
 * of previous item.
 * For first items in a list, does nothing.
 */
export const increaseItemDepth = (editor: Editor) => {
  const previousItem = getPreviousItem(editor)
  const currentItem = getCurrentItem(editor)
  const maxDepth = 6 * 2

  if (!previousItem || !currentItem) return

  const [, currentItemPath] = currentItem

  if (!Path.isPath(currentItemPath)) return

  // Get the depth of the focused list item.
  const currentItemDepth = currentItemPath.length - 1

  // Make sure the level of the focused item is below the defined maximum.
  if (currentItemDepth >= maxDepth) {
    return
  }

  // Get the depth of the deepest `li` descendant of the focused item.
  const deepestItemDepth = getDeepestItemDepth(editor, [])

  // This prevents from indenting parents of too deeply nested list items.
  if (deepestItemDepth >= maxDepth) {
    return
  }

  // Move the item in the sublist of previous item
  moveAsSubItem(
    editor,
    currentItem as NodeEntry<Element>,
    previousItem as NodeEntry<Element>
  )
}
