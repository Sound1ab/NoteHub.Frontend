import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function List({ attributes, children, element }: RenderElementProps) {
  if (element.type !== 'list') return null

  return element.ordered ? (
    <ol {...attributes}>{children}</ol>
  ) : (
    <ul {...attributes}>{children}</ul>
  )
}
