import React from 'react'
import { Editor } from 'slate'

import { inlineCodeCursorBehaviour } from '../behaviours/inlineCodeCursorBehaviour'
import { listBehaviour } from '../behaviours/listBehaviour'
import { insertLink } from '../commands/link/insertLink'
import { insertNewLine } from '../commands/insertNewLine'
import { decreaseItemDepth } from '../commands/list/decreaseItemDepth'
import { increaseItemDepth } from '../commands/list/increaseItemDepth'
import { toggleInlineStyle } from '../commands/toggleInlineStyle'

export const handleKeyDown = (editor: Editor) => (
  event: React.KeyboardEvent
) => {
  switch (event.key) {
    case 'Enter': {
      insertNewLine(editor, event)
      listBehaviour(editor, event)
      break
    }
    case 'Tab': {
      event.preventDefault()
      !event.shiftKey && increaseItemDepth(editor)
      event.shiftKey && decreaseItemDepth(editor)
      break
    }
    case 'ArrowRight': {
      inlineCodeCursorBehaviour(editor)
      break
    }
    case 'b': {
      if (event.ctrlKey) {
        event.preventDefault()
        toggleInlineStyle(editor, 'bold')
      }
      break
    }
    case 'i': {
      if (event.ctrlKey) {
        event.preventDefault()
        toggleInlineStyle(editor, 'italic')
      }
      break
    }
    case 'l': {
      if (event.ctrlKey) {
        event.preventDefault()
        insertLink(editor)
      }
      break
    }
    case 'c': {
      if (event.ctrlKey) {
        event.preventDefault()
        toggleInlineStyle(editor, 'inlineCode')
      }
      break
    }
  }
}
