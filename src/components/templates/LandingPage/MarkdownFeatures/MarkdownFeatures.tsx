import React from 'react'
import styled from 'styled-components'

import codeFences from '../../../../images/code_fences.png'
import imageUpload from '../../../../images/image_upload.png'
import inlineStyles from '../../../../images/inline_styles.png'
import lists from '../../../../images/lists.png'
import mdx from '../../../../images/mdx.png'
import toc from '../../../../images/toc.png'
import { FullBleedSection } from '../Section/Section'

export function MarkdownFeatures() {
  const images = [inlineStyles, codeFences, imageUpload, lists, mdx, toc]
  return (
    <StyledFullBleedSection>
      <Heading>Your favourite markdown features and more</Heading>
      <FeatureGallery>
        {images.map((image, index) => (
          <Feature key={index}>
            <Image src={image} />
          </Feature>
        ))}
      </FeatureGallery>
    </StyledFullBleedSection>
  )
}

const StyledFullBleedSection = styled(FullBleedSection)`
  flex-direction: column;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    padding: 0;
  }
`

const Heading = styled.h1`
  padding: 0;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.m}
      ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.l};
    text-align: left;
  }
`

const Feature = styled.article`
  min-width: ${({ theme }) => theme.spacing.xxxl};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: ${({ theme }) => theme.spacing.xs};
  background-color: var(--background-secondary);
  border-radius: ${({ theme }) => theme.spacing.xxs};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    transform: translateY(-${({ theme }) => theme.spacing.ms});
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    min-width: calc(${({ theme }) => theme.spacing.xxxl} * 2);
  }
`

const FeatureGallery = styled.div`
  overflow-x: scroll;
  display: flex;
  padding: ${({ theme }) => theme.spacing.m} ${({ theme }) => theme.spacing.m}
    ${({ theme }) => theme.spacing.m} 0;
  gap: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transition};

  ${Feature}:hover ~ ${Feature} {
    transform: translateX(${({ theme }) => theme.spacing.l});
  }

  ${Feature} + ${Feature} {
    margin-left: -${({ theme }) => theme.spacing.l};
  }
`

const Image = styled.img`
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin: 0;
`
