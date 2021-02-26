import { Editor, Range } from 'slate'

import { isItem } from './isItem'

/**
 * Return the array of items at the given range.
 *
 * Returns an empty array if no list of items can cover the range
 */
export const getItemsAtRange = (editor: Editor, range?: Range | null) => {
  range = range || editor.selection

  if (!range) {
    return []
  }

  const allItems = Editor.nodes(editor, {
    at: range,
    match: (node) => isItem(node),
  })

  return [...allItems]
}
