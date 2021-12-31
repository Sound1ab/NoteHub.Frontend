import React from 'react'
import {
  Outlet,
  useMatch,
  useNavigate,
  useResolvedPath,
} from 'react-router-dom'
import styled from 'styled-components'

import { useRepo } from '../../../hooks/recoil/useRepo'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import useDeepCompareEffect from '../../../hooks/utils/useDeepCompareEffect'
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
      <Outlet />
    </Grid>
  )
}

export { Dashboard as default }

function useSetConnectedRepo() {
  const { user, loading } = useReadGithubUser()
  const navigate = useNavigate()
  const resolvedPath = useResolvedPath('repos/connect-repo')
  const isConnectRepoMatch = useMatch({
    path: resolvedPath.pathname,
    end: true,
  })
  const [, setRepo] = useRepo()

  const connectedRepos = user?.configuration?.connectedRepos ?? []
  const login = user?.login

  useDeepCompareEffect(() => {
    if (connectedRepos.length === 0 || !login) return

    const [primaryRepo] = connectedRepos

    setRepo(`${login}/${primaryRepo}`)
  }, [connectedRepos, login])

  if (!loading && connectedRepos.length === 0) {
    // Cancel push if we're already at the connect repo path
    if (isConnectRepoMatch) return

    navigate('repos/connect-repo')
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
