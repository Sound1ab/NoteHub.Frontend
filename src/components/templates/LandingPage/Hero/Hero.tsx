import React from 'react'
import styled from 'styled-components'

import image from '../../../../images/app_development_PNG.png'
import { Section } from '../Section/Section'
import { SignUpButton } from '../SignUpButton/SignUpButton'

export function Hero() {
  return (
    <StyledSection>
      <Information>
        <h1>
          A Notebook for developers. Treat your notes like a source of truth
        </h1>
        <p>
          NoteHub uses GitHub as a datastore, so your notes are version
          controlled as well as your code. NoteHub also offers text analysis
          using ReText and MDX to bring your notes to life.
        </p>
        <SignUpButton>Start Building Your Notebook</SignUpButton>
      </Information>
      <ImageWrapper>
        <Image src={image} alt="Man sat on laptop uploading" />
      </ImageWrapper>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
  }
`

const Segment = styled.div`
  flex: 0 1 50%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Information = styled(Segment)`
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    text-align: left;
    align-items: flex-start;
  }
`

const ImageWrapper = styled(Segment)`
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.s};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-end;
  }
`

const Image = styled.img`
  max-width: ${({ theme }) => theme.spacing.xxxl};
`
