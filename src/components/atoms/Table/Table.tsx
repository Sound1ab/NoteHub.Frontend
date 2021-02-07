import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

export function Table({ attributes, children }: RenderElementProps) {
  return (
    <StyledTable>
      <tbody {...attributes}>{children}</tbody>
    </StyledTable>
  )
}

const StyledTable = styled.table`
  color: var(--text-primary);
`
