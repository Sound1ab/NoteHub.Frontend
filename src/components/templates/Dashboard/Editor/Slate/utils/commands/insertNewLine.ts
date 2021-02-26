import React from 'react'
import { Editor, Transforms } from 'slate'

import { isTypeActive } from '../helpers/isTypeActive'

export function insertNewLine(
  editor: Editor,
  event: React.KeyboardEvent<Element>
) {
  if (!event.metaKey) return

  event.preventDefault()

  if (!isTypeActive(editor, 'code') && !isTypeActive(editor, 'blockquote'))
    return

  Transforms.insertText(editor, '\n')
}
