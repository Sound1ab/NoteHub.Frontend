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
  className?: string
  image?: string
}

export function Avatar({ className, image = 'avatar.png' }: IAvatar) {
  return (
    <Style className={className}>
      <img src={image} alt="avatar" />
    </Style>
  )
}
