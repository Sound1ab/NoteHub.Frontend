import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { Icon } from '../../../atoms/Icon/Icon'
import { Profile } from './Profile/Profile'

export function PrimarySidebar() {
  const { url } = useRouteMatch()

  return (
    <StyledPrimarySidebar>
      <StyledProfile />
      <StyledLink to={`${url}/repos`}>
        <StyledIcon icon="sync" size="lg" />
        <h5>Repos</h5>
      </StyledLink>
      <StyledLink to={`${url}/text-check`}>
        <StyledIcon icon="binoculars" size="lg" />
        <h5>Text check</h5>
      </StyledLink>
      <StyledLink to={`${url}/settings`}>
        <StyledIcon icon="sync" size="lg" />
        <h5>Settings</h5>
      </StyledLink>
    </StyledPrimarySidebar>
  )
}

const StyledPrimarySidebar = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
  flex: 0 0 100%;
  height: 100vh;
  background-color: var(--background-primary);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid var(--border-primary);
  // Needed to contain children from overflowing and make flex item scroll
  overflow-y: auto;
  z-index: 2;
  position: sticky;
  top: 0.01px;
  align-self: start;

  a + a {
    margin-top: ${({ theme }) => theme.spacing.s};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: primarysidebar;
  }
`

const StyledProfile = styled(Profile)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s};
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const StyledIcon = styled(Icon)`
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`
