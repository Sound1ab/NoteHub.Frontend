import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

export function Heading({ attributes, children, element }: RenderElementProps) {
  if (element.type !== 'heading') return null

  switch (element.depth) {
    case 1:
      return <h1 {...attributes}>{children}</h1>
    case 2:
      return <h2 {...attributes}>{children}</h2>
    case 3:
      return <h3 {...attributes}>{children}</h3>
    case 4:
      return <h4 {...attributes}>{children}</h4>
    case 5:
      return <h5 {...attributes}>{children}</h5>
    case 6:
      return <h6 {...attributes}>{children}</h6>
    default:
      throw new Error('Heading does not exist')
  }
}
