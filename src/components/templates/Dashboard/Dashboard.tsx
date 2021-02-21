import React from 'react'
import styled from 'styled-components'

import { EditorSwitch } from '../../utility/Switch/EditorSwitch'
import { PrimarySidebar } from './PrimarySidebar/PrimarySidebar'
import { Sidebar } from './Sidebar/Sidebar'
import { Toolbar } from './Toolbar/Toolbar'

function Dashboard() {
  return (
    <Grid>
      <Toolbar />
      <MobileScroll>
        <PrimarySidebar />
        <Sidebar />
      </MobileScroll>
      <EditorSwitch />
    </Grid>
  )
}

export { Dashboard as default }

const Grid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-template-columns:
      auto
      min-content
      3fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'primarysidebar sidebar toolbar'
      'primarysidebar sidebar editor';
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
