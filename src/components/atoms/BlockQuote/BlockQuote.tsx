import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function BlockQuote({ attributes, children }: RenderElementProps) {
  return <blockquote {...attributes}>{children}</blockquote>
}
