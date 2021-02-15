import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

export function THead({ children, attributes }: RenderElementProps) {
  return (
    <StyledTHead {...attributes}>
      <tr>{children}</tr>
    </StyledTHead>
  )
}

const StyledTHead = styled.thead`
  font-weight: bold;
`
