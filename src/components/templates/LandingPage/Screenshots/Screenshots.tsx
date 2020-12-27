import React from 'react'
import styled from 'styled-components'

import desktop from '../../../../images/desktop_screenshot.png'
import { FullBleedSection } from '../Section/Section'

export function Screenshots() {
  return (
    <StyledFullBleedSection>
      <Image src={desktop} />
    </StyledFullBleedSection>
  )
}

const StyledFullBleedSection = styled(FullBleedSection)`
  padding: ${({ theme }) => theme.spacing.m};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
  }
`

const Image = styled.img`
  width: 100%;
  height: auto;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 0;
`
