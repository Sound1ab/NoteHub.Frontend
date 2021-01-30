import React from 'react'
import { RenderLeafProps } from 'slate-react/dist/components/editable'

export function Leaf({ attributes, children, leaf }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  return <span {...attributes}>{children}</span>
}
