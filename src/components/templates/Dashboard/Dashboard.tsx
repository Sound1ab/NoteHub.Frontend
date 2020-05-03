import React from 'react'

import { styled } from '../../../theme'
import { Editor, Sidebar, Toolbar } from '../../organisms'

const Style = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns:
      min-content
      3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'toolbar toolbar'
      'sidebar editor';
  }

  .Dashboard-content {
    flex: 1;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    > div {
      scroll-snap-align: start;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: contents;
    }
  }
`

export function Dashboard() {
  return (
    <Style>
      <Toolbar />
      <div className="Dashboard-content">
        <Sidebar />
        <Editor />
      </div>
    </Style>
  )
}
