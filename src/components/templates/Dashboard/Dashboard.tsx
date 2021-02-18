import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { useReadRepo } from '../../../hooks/repo/useReadRepo'
import { SlateValueProvider } from '../../providers/SlateValueProvider/SlateValueProvider'
import { Configuration } from './Configuration/Configuration'
import { Repos } from './Configuration/Repos/Repos'
import { Settings } from './Configuration/Settings/Settings'
import { TextCheck } from './Configuration/TextCheck/TextCheck'
import { Editor } from './Editor/Editor'
import { PrimarySidebar } from './PrimarySidebar/PrimarySidebar'
import { Sidebar } from './Sidebar/Sidebar'
import { Toolbar } from './Toolbar/Toolbar'

function Dashboard() {
  const { repo, loading } = useReadRepo()
  const { path } = useRouteMatch()

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
      <Toolbar />
      <MobileScroll>
        <PrimarySidebar />
        <Sidebar />
        <Switch>
          <Route exact path={path}>
            <SlateValueProvider>
              <Editor />
            </SlateValueProvider>
          </Route>
          <Route path={`${path}/settings`}>
            <Configuration>
              <Settings />
            </Configuration>
          </Route>
          <Route path={`${path}/text-check`}>
            <Configuration>
              <TextCheck />
            </Configuration>
          </Route>
          <Route path={`${path}/repos`}>
            <Configuration>
              <Repos />
            </Configuration>
          </Route>
        </Switch>
      </MobileScroll>
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
