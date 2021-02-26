import { Editor, Path } from 'slate'

import { getCurrentItem } from './getCurrentItem'
import { getListForItem } from './getListForItem'

/**
 * Return the parent list block, from current selection or from a node (paragraph in a list item).
 */
export const getCurrentList = (editor: Editor, path: Path) => {
  const itemEntry = getCurrentItem(editor, path)

  if (!itemEntry) return null

  const [, itemPath] = itemEntry

  if (!Path.isPath(itemPath)) return

  return getListForItem(editor, itemPath)
}
