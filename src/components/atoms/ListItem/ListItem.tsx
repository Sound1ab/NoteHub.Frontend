import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function ListItem({ attributes, children }: RenderElementProps) {
  return <li {...attributes}>{children}</li>
}
