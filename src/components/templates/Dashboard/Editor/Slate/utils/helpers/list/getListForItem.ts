import { Editor, Path } from 'slate'

import { isList } from './isList'

/**
 * Return the parent list block for an item block.
 */
export const getListForItem = (editor: Editor, path: Path) =>
  Editor.above(editor, {
    at: path,
    match: (node) => isList(node),
  }) || null
