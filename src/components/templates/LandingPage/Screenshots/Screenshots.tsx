import React from 'react'
import styled from 'styled-components'

// @ts-ignore
import responsiveImage from '../../../../images/desktop_screenshot.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600'
// @ts-ignore
import responsiveImageWebp from '../../../../images/desktop_screenshot.png?sizes[]=300,sizes[]=600,sizes[]=800,sizes[]=1200,sizes[]=1600&format=webp'
import { FullBleedSection } from '../Section/Section'

export function Screenshots() {
  return (
    <StyledFullBleedSection>
      <picture>
        <source
          srcSet={responsiveImageWebp.srcSet}
          type="image/webp"
          sizes="(min-width: 780px) calc(100vw - 122px), calc(100vw - 61px)"
        />
        <Image
          src={responsiveImage.src}
          srcSet={responsiveImage.srcSet}
          width={responsiveImage.width}
          height={responsiveImage.height}
          sizes="(min-width: 780px) calc(100vw - 122px), calc(100vw - 61px)"
          alt="Screenshot of NoteHub"
        />
      </picture>
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
