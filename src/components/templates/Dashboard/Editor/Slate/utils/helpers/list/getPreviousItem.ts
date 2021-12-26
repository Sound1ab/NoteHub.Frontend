import { Editor, Element, Node, Path } from 'slate'

import { getCurrentItem } from './getCurrentItem'

/**
 * Return the previous item, from current selection or from a node.
 */
export const getPreviousItem = (editor: Editor, path?: Path) => {
  const item = getCurrentItem(editor, path)

  if (!item) return null

  const [currentItem, currentItemPath] = item

  if (!currentItem) return null

  let previousSiblingPath = null

  if (!Path.isPath(currentItemPath)) return null

  try {
    previousSiblingPath = Path.previous(currentItemPath)
  } catch (e) {
    // Slate throws when trying to find
    // previous of a first element
    // we interpret it as there not being a previous item
    return null
  }

  const previousSibling = Node.get(editor, previousSiblingPath)

  if (!previousSibling) {
    return null
  } else if (
    Element.isElement(previousSibling) &&
    previousSibling.type === 'listItem'
  ) {
    return [previousSibling, previousSiblingPath]
  }
  return null
}
