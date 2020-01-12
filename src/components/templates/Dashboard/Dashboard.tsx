import React from 'react'

import { styled } from '../../../theme'
import { CardList, Editor, Sidebar, Toolbar } from '../../organisms'

const Style = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  > div {
    scroll-snap-align: start;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns:
      min-content
      min-content
      3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'toolbar toolbar toolbar'
      'sidebar cardlist editor';
  }
`

export function Dashboard() {
  return (
    <Style>
      <Toolbar />
      <Sidebar />
      <CardList />
      <Editor />
    </Style>
  )
}
