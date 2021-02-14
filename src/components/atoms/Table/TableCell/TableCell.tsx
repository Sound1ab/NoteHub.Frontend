import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'

import { Td } from './Td'
import { Th } from './Th'

interface ITableCell extends RenderElementProps {
  header?: boolean
}

export function TableCell({ header, children, ...rest }: ITableCell) {
  return header ? <Th {...rest}>{children}</Th> : <Td {...rest}>{children}</Td>
}
