import React from 'react'
import { Redirect } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import styled from 'styled-components'

import { useReadRepo } from '../../../hooks/repo/useReadRepo'
import { CodeMirror } from './CodeMirror/CodeMirror'
import { DraftManager } from './DraftManager/DraftManager'
import { Sidebar } from './Sidebar/Sidebar'
import { Toolbar } from './Toolbar/Toolbar'

function Dashboard() {
  const { repo, loading } = useReadRepo()

  if (loading) {
    return null
  }

  if (!repo) {
    return (
      <Redirect
        to={{
          pathname: '/setup',
        }}
      />
    )
  }

  return (
    <Grid>
      <CodeMirror>
        {(Editor) => (
          <>
            <Toolbar />
            <MobileScroll>
              <Sidebar />
              {Editor}
            </MobileScroll>
            <DraftManager />
          </>
        )}
      </CodeMirror>
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
