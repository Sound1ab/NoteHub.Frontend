import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

export function Td({ attributes, children }: RenderElementProps) {
  return <StyledTd {...attributes}>{children}</StyledTd>
}

const StyledTd = styled.td`
  position: relative;
  border-bottom: 1px solid var(--accent-primary);
`
