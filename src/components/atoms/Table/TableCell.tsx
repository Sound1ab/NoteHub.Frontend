import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function TableCell({ attributes, children }: RenderElementProps) {
  return <td {...attributes}>{children}</td>
}
