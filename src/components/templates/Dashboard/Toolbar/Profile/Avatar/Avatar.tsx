import React from 'react'

import { styled } from '../../../../../../theme'

interface IAvatar {
  image?: string | null
  onClick?: () => void
}

export function Avatar({ image, onClick }: IAvatar) {
  return (
    <StyledAvatar onClick={onClick}>
      {image ? <Image src={image} alt="avatar" /> : <Placeholder />}
    </StyledAvatar>
  )
}

const StyledAvatar = styled.div`
  position: relative;
  height: ${({ theme }) => theme.spacing.m};
  width: ${({ theme }) => theme.spacing.m};
`

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 100%;
  width: 100%;
`

const Placeholder = styled.div`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
`
