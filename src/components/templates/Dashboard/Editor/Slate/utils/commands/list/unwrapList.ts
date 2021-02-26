import { Editor, Path, Transforms } from 'slate'

import { getTopmostItemsAtRange } from '../../helpers/list/getTopmostItemsAtRange'

/**
 * Unwrap items at range from their list.
 */
export const unwrapList = (editor: Editor): void => {
  const items = getTopmostItemsAtRange(editor)

  if (items.length === 0) return

  Editor.withoutNormalizing(editor, () => {
    const itemPaths = items.map(([, itemPath]) => {
      if (!Path.isPath(itemPath)) return

      return Editor.pathRef(editor, itemPath)
    })

    itemPaths.forEach((itemPath) => {
      if (!itemPath?.current) return

      Transforms.liftNodes(editor, {
        at: itemPath.current,
      })
      Transforms.unwrapNodes(editor, {
        at: itemPath.current,
      })
      itemPath.unref()
    })
  })
}
