import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

import { TBody } from './TBody'
import { THead } from './THead'

interface ITableRow extends RenderElementProps {
  header?: boolean
  footer?: boolean
}

export function TableRow({ children, header, ...rest }: ITableRow) {
  return (
    <>
      {header ? (
        <THead {...rest}>{children}</THead>
      ) : (
        <TBody {...rest}>{children}</TBody>
      )}
    </>
  )
}
