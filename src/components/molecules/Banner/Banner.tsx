import React from 'react'
import SofarImage from '../../../images/header.jpg'
import { styled } from '../../../theme'
import { Heading, Image } from '../../atoms'

const Style = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  .banner-text {
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`

interface IBanner {
  text?: string
}

export function Banner({ text = '' }: IBanner) {
  return (
    <Style>
      <Image src={SofarImage} />
      <Heading type="h1" className="banner-text">
        {text}
      </Heading>
    </Style>
  )
}
