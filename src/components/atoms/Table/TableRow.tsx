import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

export function TableRow({ attributes, children }: RenderElementProps) {
  return <StyledTableRow {...attributes}>{children}</StyledTableRow>
}

const StyledTableRow = styled.tr`
  border-bottom: solid ${({ theme }) => theme.spacing.xxxs}
    var(--background-tertiary);
`
