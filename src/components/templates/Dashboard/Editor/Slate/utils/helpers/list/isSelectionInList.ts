import { Editor } from 'slate'

import { getTopmostItemsAtRange } from './getTopmostItemsAtRange'

/**
 * Return the current list item, from current selection or from a node.
 */
export const isSelectionInList = (editor: Editor): boolean =>
  getTopmostItemsAtRange(editor).length !== 0
