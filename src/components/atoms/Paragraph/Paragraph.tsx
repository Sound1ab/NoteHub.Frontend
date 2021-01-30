import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function Paragraph({ attributes, children }: RenderElementProps) {
  return <p {...attributes}>{children}</p>
}
