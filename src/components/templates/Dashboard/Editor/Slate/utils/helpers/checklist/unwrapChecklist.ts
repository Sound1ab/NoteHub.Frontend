import { Editor, Path, Transforms } from 'slate'

import { getCurrentChecklistItem } from './getCurrentChecklistItem'

/**
 * Unwrap items at range from their list.
 */
export const unwrapChecklist = (editor: Editor): void => {
  const item = getCurrentChecklistItem(editor)

  if (!item) return

  Editor.withoutNormalizing(editor, () => {
    const [, itemPath] = item

    if (!Path.isPath(itemPath)) return

    const pathRef = Editor.pathRef(editor, itemPath)

    if (!pathRef?.current) return

    Transforms.liftNodes(editor, {
      at: pathRef.current,
    })
    Transforms.unwrapNodes(editor, {
      at: pathRef.current,
    })
    pathRef.unref()
  })
}
