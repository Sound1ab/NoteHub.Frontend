import React from 'react'
import styled from 'styled-components'

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
  width: ${({ theme }) => theme.spacing.l};
`

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  margin: 0;
`

const Placeholder = styled.div`
  border-radius: 50%;
  height: 100%;
  width: 100%;
  background-color: var(--accent-primary);
`
