import { Editor, Path } from 'slate'

import { isItem } from './isItem'

/**
 * Find all `list_item` descendants of a node and retrieve the deepest depth.
 */

export const getDeepestItemDepth = (editor: Editor, path: Path): number =>
  [
    ...Editor.nodes(editor, {
      at: path,
      match: isItem,
    }),
  ].reduce(
    (maxLevel, [, itemPath]) =>
      Math.max(maxLevel, itemPath.length - path.length),
    0
  )
