import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function List({ attributes, children, element }: RenderElementProps) {
  return element.ordered ? (
    <ol {...attributes}>{children}</ol>
  ) : (
    <ul {...attributes}>{children}</ul>
  )
}
