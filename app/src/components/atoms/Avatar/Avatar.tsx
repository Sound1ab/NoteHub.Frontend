import React from 'react'
import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;

  img {
    object-fit: cover;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
`

interface IAvatar {
  image: string
  className?: string
}

export function Avatar({ className, image }: IAvatar) {
  return (
    <Style className={className}>
      <img src={image} alt="avatar" />
    </Style>
  )
}
