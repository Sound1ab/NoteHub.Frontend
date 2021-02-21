import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { useRepo } from '../../../hooks/recoil/useRepo'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import useDeepCompareEffect from '../../../hooks/utils/useDeepCompareEffect'
import { EditorSwitch } from '../../utility/Switch/EditorSwitch'
import { PrimarySidebar } from './PrimarySidebar/PrimarySidebar'
import { Sidebar } from './Sidebar/Sidebar'
import { Toolbar } from './Toolbar/Toolbar'

function Dashboard() {
  useSetConnectedRepo()

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

function useSetConnectedRepo() {
  const { user, loading } = useReadGithubUser()
  const { path } = useRouteMatch()
  const { push, location } = useHistory()
  const [, setRepo] = useRepo()

  const connectedRepos = user?.configuration?.connectedRepos ?? []
  const login = user?.login

  useDeepCompareEffect(() => {
    if (connectedRepos.length === 0 || !login) return

    const [primaryRepo] = connectedRepos

    setRepo(`${login}/${primaryRepo}`)
  }, [connectedRepos, login])

  if (!loading && connectedRepos.length === 0) {
    const connectRepoPath = `${path}/repos/connect-repo`

    // Cancel push if we're already at the connect repo path
    if (location.pathname === connectRepoPath) return

    push(`${path}/repos/connect-repo`)
  }
}

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
