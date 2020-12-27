import React from 'react'
import styled from 'styled-components'

import { Icon } from '../../../atoms'
import { Section } from '../Section/Section'

export function Features() {
  return (
    <StyledSection>
      <Heading>Clean and simple on the outside, powerful on the inside</Heading>
      <FeatureGrid>
        <div>
          <FeatureHeading>
            <FeatureIcon icon="github" prefix="fab" size="lg" marginRight />
            Backed by GitHub
          </FeatureHeading>
          <FeatureCopy>
            Stores all your notes on GitHub, keeping your notes as safe as your
            project code.
          </FeatureCopy>
        </div>
        <div>
          <FeatureHeading>
            <FeatureIcon icon="code" prefix="fas" size="lg" marginRight />
            MDX integration
          </FeatureHeading>
          <FeatureCopy>
            Use our custom collection of React components to bring your
            documents to life.
          </FeatureCopy>
        </div>
        <div>
          <FeatureHeading>
            <FeatureIcon icon="binoculars" prefix="fas" size="lg" marginRight />
            ReText
          </FeatureHeading>
          <FeatureCopy>
            Analyse your markdown using ReText and get feedback on spelling,
            readability, indefinite articles and more.
          </FeatureCopy>
        </div>
        <div>
          <FeatureHeading>
            <FeatureIcon icon="rocket" prefix="fas" size="lg" marginRight />
            ReMark
          </FeatureHeading>
          <FeatureCopy>
            Enhanced markdown preview using ReMark to auto generate a table of
            contents and provide GitHub flavoured markdown.
          </FeatureCopy>
        </div>
        <div>
          <FeatureHeading>
            <FeatureIcon icon="moon" prefix="fas" size="lg" marginRight />
            Dark and light mode
          </FeatureHeading>
          <FeatureCopy>Choose a theme that works for you.</FeatureCopy>
        </div>
        <div>
          <FeatureHeading>
            <FeatureIcon
              icon="info-circle"
              prefix="fas"
              size="lg"
              marginRight
            />
            Free and open source
          </FeatureHeading>
          <FeatureCopy>
            Completely free and open source so you can use NoteHub with
            confidence.
          </FeatureCopy>
        </div>
      </FeatureGrid>
    </StyledSection>
  )
}

const StyledSection = styled(Section)`
  display: block;
`

const Heading = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.l};
`

const FeatureGrid = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing.xs};
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
`

const FeatureHeading = styled.h4`
  display: flex;
`

const FeatureIcon = styled(Icon)`
  display: inline-block;
`

const FeatureCopy = styled.p`
  color: var(--text-secondary);
`
