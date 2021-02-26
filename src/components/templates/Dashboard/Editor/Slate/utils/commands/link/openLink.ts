import React from 'react'
import { Editor, Node } from 'slate'

import { isTypeActive } from '../../helpers/isTypeActive'

export function openLink(editor: Editor, event: React.MouseEvent) {
  if (!event.metaKey || !isTypeActive(editor, 'link')) return

  const range = editor.selection

  if (!range) return

  const {
    anchor: { path },
  } = range

  // Getting the parent of a text node
  const node = Node.parent(editor, path)

  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: node.url,
  }).click()
}
