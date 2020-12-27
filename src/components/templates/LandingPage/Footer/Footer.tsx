import React from 'react'
import styled from 'styled-components'

import { getLoginLink } from '../../../../utils/getLoginLink'
import { Icon } from '../../../atoms/Icon/Icon'
import { HorizontalList, ListItem } from '../HorizontalList/HoriztonalList'
import { Logo } from '../Logo/logo'
import { Section } from '../Section/Section'

export function Footer() {
  return (
    <StyledSection as="footer">
      <LogoWrapper>
        <Logo />
        <a
          href="https://github.com/Sound1ab/NoteHub.Frontend"
          target="_blank"
          rel="noreferrer"
        >
          <StyledIcon icon="github" prefix="fab" size="lg" marginRight />
        </a>
      </LogoWrapper>
      <StyledHr />
      <LinkWrapper>
        <HorizontalList>
          <ListItem>
            <a href="mailto:phillipparker.io">Email</a>
          </ListItem>
          <ListItem>
            <a href={getLoginLink()} target="_self" rel="noopener">
              Login
            </a>
          </ListItem>
          <ListItem>
            <a href={getLoginLink()} target="_self" rel="noopener">
              Signup
            </a>
          </ListItem>
        </HorizontalList>
      </LinkWrapper>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  max-width: ${({ theme }) => theme.breakpoints.tablet};
  margin: 0 auto;
  flex-direction: column;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`

const StyledHr = styled.hr`
  margin: 0;
`

const LinkWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.xs};
`

const StyledIcon = styled(Icon)`
  color: var(--text-primary);
`
