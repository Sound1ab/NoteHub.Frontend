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

  .Avatar-placeholder {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    background-color: ${({ theme }) => theme.colors.accent};
  }
`

interface IAvatar {
  image?: string | null
  className?: string
}

export function Avatar({ className, image }: IAvatar) {
  return (
    <Style className={className}>
      {image ? (
        <img src={image} alt="avatar" />
      ) : (
        <div className="Avatar-placeholder" />
      )}
    </Style>
  )
}
