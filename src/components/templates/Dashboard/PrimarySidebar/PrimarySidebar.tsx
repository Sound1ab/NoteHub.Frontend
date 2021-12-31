import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../../atoms/Icon/Icon'
import { Link } from './Link/Link'
import { Profile } from './Profile/Profile'

export function PrimarySidebar() {
  return (
    <StyledPrimarySidebar>
      <StyledProfile />
      <Link to=".">
        <StyledIcon icon="pen" size="lg" />
        <Heading>Editor</Heading>
      </Link>
      <Link to="repos">
        <StyledIcon icon="sync" size="lg" />
        <Heading>Repos</Heading>
      </Link>
      <Link to="settings">
        <StyledIcon icon="sync" size="lg" />
        <Heading>Settings</Heading>
      </Link>
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

const StyledIcon = styled(Icon)`
  margin-bottom: ${({ theme }) => theme.spacing.s};
`

const Heading = styled.h5`
  margin-bottom: 0;
`
