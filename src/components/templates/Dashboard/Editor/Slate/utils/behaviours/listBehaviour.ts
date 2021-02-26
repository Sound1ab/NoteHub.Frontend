import React from 'react'
/**
 * User pressed Enter in an editor
 *
 * Enter in a list item should split the list item
 * Enter in an empty list item should remove it
 * Shift+Enter in a list item should make a new line
 */
import { Editor, Node } from 'slate'

import { decreaseItemDepth } from '../commands/list/decreaseItemDepth'
import { splitListItem } from '../commands/list/splitListItem'
import { unwrapList } from '../commands/list/unwrapList'
import { getCurrentItem } from '../helpers/list/getCurrentItem'
import { getItemDepth } from '../helpers/list/getItemDepth'

export function listBehaviour(
  editor: Editor,
  event: React.KeyboardEvent<Element>
) {
  const currentItem = getCurrentItem(editor)

  if (event.shiftKey || !currentItem) return

  event.preventDefault()

  const [currentItemNode] = currentItem

  editor.deleteFragment()

  if (
    !Editor.isVoid(editor, currentItemNode) &&
    Node.string(currentItemNode) === ''
  ) {
    // Block is empty, we exit the list
    if (getItemDepth(editor) > 1) {
      decreaseItemDepth(editor)
    } else {
      // Exit list
      unwrapList(editor)
    }
  } else {
    // Split list item
    splitListItem(editor)
  }
}
