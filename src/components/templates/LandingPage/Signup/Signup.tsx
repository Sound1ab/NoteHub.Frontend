import React from 'react'
import styled from 'styled-components'

import { Section } from '../Section/Section'
import { SignUpButton } from '../SignUpButton/SignUpButton'

export function Signup() {
  return (
    <StyledSection>
      <h1>Use effortlessly</h1>
      <h3>
        We use GitHub to authenticate so you&apos;re probably already logged in!
      </h3>
      <StyledSignUpButton>Give it a go</StyledSignUpButton>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const StyledSignUpButton = styled(SignUpButton)`
  --margin: ${({ theme }) => theme.spacing.l};
  margin: var(--margin) var(--margin) 0 var(--margin);
`
