import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

interface IList extends RenderElementProps {
  ordered: boolean
}

export function List({ attributes, children, ordered }: IList) {
  return ordered ? (
    <ol {...attributes}>{children}</ol>
  ) : (
    <ul {...attributes}>{children}</ul>
  )
}
