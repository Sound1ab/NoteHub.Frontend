import React from 'react'
import styled from 'styled-components'

import { getLoginLink } from '../../../../utils/getLoginLink'
import { HorizontalList, ListItem } from '../HorizontalList/HoriztonalList'
import { Logo } from '../Logo/logo'
import { Section } from '../Section/Section'
import { SignUpButton } from '../SignUpButton/SignUpButton'

export function Navigation() {
  return (
    <StyledSection as="header">
      <Logo />
      <LinkWrapper>
        <HorizontalList>
          <ListItem>
            <a href={getLoginLink()} target="_self" rel="noopener">
              Login
            </a>
          </ListItem>
        </HorizontalList>
        <Divider />
        <SignUpButton>Sign Up</SignUpButton>
      </LinkWrapper>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  max-width: ${({ theme }) => theme.breakpoints.tablet};
  margin: 0 auto;
`

const LinkWrapper = styled.nav`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Divider = styled.hr`
  width: ${({ theme }) => theme.spacing.m};
  margin: 0;
  transform: rotate(90deg);
  display: inline-block;
`
