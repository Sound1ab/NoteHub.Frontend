import React from 'react'
/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
import { Editor, Node } from 'slate'

import { getCurrentChecklistItem } from '../helpers/checklist/getCurrentChecklistItem'
import { splitChecklistItem } from '../helpers/checklist/splitChecklistItem'
import { unwrapChecklist } from '../helpers/checklist/unwrapChecklist'

export function checklistBehaviour(
  editor: Editor,
  event: React.KeyboardEvent<Element>
) {
  const currentItem = getCurrentChecklistItem(editor)

  if (event.shiftKey || !currentItem) return

  event.preventDefault()

  const [currentItemNode] = currentItem

  editor.deleteFragment()

  if (
    !Editor.isVoid(editor, currentItemNode) &&
    Node.string(currentItemNode) === ''
  ) {
    // Exit list
    unwrapChecklist(editor)
  } else {
    // Split list item
    splitChecklistItem(editor)
  }
}
