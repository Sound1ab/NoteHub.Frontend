import React from 'react'

import { styled } from '../../../theme'
import { Editor, Sidebar, Toolbar } from '../../organisms'
import { EasyMDEProvider } from '../../utility'

export function Dashboard() {
  return (
    <Grid>
      <EasyMDEProvider>
        <Toolbar />
        <MobileScroll>
          <Sidebar />
          <Editor />
        </MobileScroll>
      </EasyMDEProvider>
    </Grid>
  )
}

const Grid = styled.div`
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
      'sidebar toolbar'
      'sidebar editor';
  }
`

const MobileScroll = styled.div`
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
`
