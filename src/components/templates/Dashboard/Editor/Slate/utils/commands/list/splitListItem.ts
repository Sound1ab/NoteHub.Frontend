import { Editor, Transforms } from 'slate'

import { isItem } from '../../helpers/list/isItem'

/**
 * Split a list item at the start of the current range.
 */
export const splitListItem = (editor: Editor): void =>
  Transforms.splitNodes(editor, {
    match: (n) => isItem(n),
    always: true,
  })
