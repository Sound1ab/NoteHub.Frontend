import React from 'react'
import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
  height: ${({theme}) => theme.spacing.m};
  width: ${({theme}) => theme.spacing.m};

  img {
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }

  .Avatar-placeholder {
    border-radius: 50%;
    height: 100%;
    width: 100%;
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
