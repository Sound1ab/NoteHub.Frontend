import { Editor, Path } from 'slate'

import { getCurrentItem } from './getCurrentItem'

/**
 * Get depth of current block in a document list
 */
export const getItemDepth = (editor: Editor, path?: Path): number => {
  const item = getCurrentItem(editor, path)

  if (item && Path.isPath(item[1])) {
    path = item[1]
  } else {
    return 0
  }

  const [, parentPath] = Editor.parent(editor, path)

  return 1 + getItemDepth(editor, parentPath)
}
