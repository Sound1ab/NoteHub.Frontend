import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ITableFoot {
  children: ReactNode
}

export function TableFoot({ children }: ITableFoot) {
  return <TFoot>{children}</TFoot>
}

const TFoot = styled.tfoot`
  border-bottom: solid ${({ theme }) => theme.spacing.xxxs}
    var(--background-tertiary);
`
