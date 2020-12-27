import React from 'react'
import styled from 'styled-components'

export function Logo() {
  return (
    <LogoWrapper>
      <StyledLogo>📓</StyledLogo>
      <LighterHeading>Note</LighterHeading>
      <Heading>Hub</Heading>
    </LogoWrapper>
  )
}

const LogoWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
`

const StyledLogo = styled.span`
  font-size: ${({ theme }) => theme.spacing.ml};
  margin-right: ${({ theme }) => theme.spacing.xs};
  height: 31px;
  transform: translateY(-16px) translateX(-4px);
  width: 24px;
`

const Heading = styled.h3`
  margin-bottom: 0;
`

const LighterHeading = styled(Heading)`
  font-weight: lighter !important;
  color: var(--accent-primary) !important;
`
