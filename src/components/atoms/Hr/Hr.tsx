import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

type Hr = Omit<RenderElementProps, 'children'>

export function Hr({ attributes }: Hr) {
  return <hr {...attributes} />
}
