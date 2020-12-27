import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface IHorizontalList {
  children: ReactNode
}

export function HorizontalList({ children }: IHorizontalList) {
  return <List>{children}</List>
}

export const ListItem = styled.li`
  display: inline-block;
  margin-bottom: 0;
  text-decoration: none;
`

const List = styled.ul`
  margin: 0;

  ${ListItem} + ${ListItem} {
    margin-left: ${({ theme }) => theme.spacing.s};
  }
`
