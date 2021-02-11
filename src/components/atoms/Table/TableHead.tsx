import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ITableHead {
  children: ReactNode
}

export function TableHead({ children }: ITableHead) {
  return <THead>{children}</THead>
}

const THead = styled.thead`
  border-bottom: solid ${({ theme }) => theme.spacing.xxxs}
    var(--background-tertiary);
`
