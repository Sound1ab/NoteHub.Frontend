import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

interface ILink extends RenderElementProps {
  link?: string
}

export function Link({ attributes, children, link }: ILink) {
  return (
    <a {...attributes} href={link}>
      {children}
    </a>
  )
}
