import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { Icon } from '../../../atoms/Icon/Icon'
import { Profile } from './Profile/Profile'

export function PrimarySidebar() {
  const { url } = useRouteMatch()
  const { pathname } = useLocation()

  const repos = `${url}/repos`
  const settings = `${url}/settings`

  return (
    <StyledPrimarySidebar>
      <StyledProfile />
      <StyledLink to={url} isActive={pathname === url}>
        <StyledIcon icon="pen" size="lg" />
        <Heading>Editor</Heading>
      </StyledLink>
      <StyledLink to={repos} isActive={pathname === repos}>
        <StyledIcon icon="sync" size="lg" />
        <Heading>Repos</Heading>
      </StyledLink>
      <StyledLink to={settings} isActive={pathname === settings}>
        <StyledIcon icon="sync" size="lg" />
        <Heading>Settings</Heading>
      </StyledLink>
    </StyledPrimarySidebar>
  )
}

const StyledPrimarySidebar = styled.div`
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

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: primarysidebar;
  }
`

const StyledProfile = styled(Profile)`
  padding: ${({ theme }) => theme.spacing.s};
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)<{ isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--background-secondary);
    `};

  &:hover {
    background-color: var(--background-tertiary);
  }
`

const StyledIcon = styled(Icon)`
  margin-bottom: ${({ theme }) => theme.spacing.s};
`

const Heading = styled.h5`
  margin-bottom: 0;
`
