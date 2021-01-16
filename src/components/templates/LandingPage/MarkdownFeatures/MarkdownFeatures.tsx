import React from 'react'
import styled from 'styled-components'

// @ts-ignore
import codeFences from '../../../../images/code_fences.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import codeFencesWebp from '../../../../images/code_fences.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
// @ts-ignore
import imageUpload from '../../../../images/image_upload.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import imageUploadWebp from '../../../../images/image_upload.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
// @ts-ignore
import inlineStyles from '../../../../images/inline_styles.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import inlineStylesWebp from '../../../../images/inline_styles.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
// @ts-ignore
import lists from '../../../../images/lists.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import listsWebp from '../../../../images/lists.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
// @ts-ignore
import mdx from '../../../../images/mdx.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import mdxWebp from '../../../../images/mdx.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
// @ts-ignore
import toc from '../../../../images/toc.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import tocWebp from '../../../../images/toc.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
import { FullBleedSection } from '../Section/Section'

export function MarkdownFeatures() {
  const images = [
    [inlineStyles, inlineStylesWebp],
    [codeFences, codeFencesWebp],
    [imageUpload, imageUploadWebp],
    [lists, listsWebp],
    [mdx, mdxWebp],
    [toc, tocWebp],
  ]
  return (
    <StyledFullBleedSection>
      <Heading>Your favourite markdown features and more</Heading>
      <FeatureGallery>
        {images.map(([image, webpImage], index) => (
          <Feature key={index}>
            <picture>
              <source
                srcSet={webpImage.srcSet}
                type="image/webp"
                sizes="(min-width: 780px) 548px, 264px"
              />
              <Image
                src={image.src}
                srcSet={image.srcSet}
                sizes="(min-width: 780px) 548px, 264px"
                alt="Mardown feature"
                loading="lazy"
                width={image.width}
                height={image.height}
              />
            </picture>
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
  border-radius: ${({ theme }) => theme.borderRadius};
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
  width: 100%;
  height: auto;
`
