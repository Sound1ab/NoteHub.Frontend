import React from 'react'

import { styled } from '../../../../../../theme'

interface IWidget {
  position: { left: number; right: number; top: number; bottom: number }
  message: string
}

export function Widget({ position, message }: IWidget) {
  return (
    <Wrapper position={position}>
      <Message>{message}</Message>
    </Wrapper>
  )
}

const Wrapper = styled.div<Pick<IWidget, 'position'>>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 3px;
  padding: ${({ theme }) => theme.spacing.xxs};
  margin-top: ${({ theme }) => theme.spacing.s};
  top: ${({ position: { top } }) => `${top}px`};
  left: ${({ position: { left }, theme }) =>
    `calc(${left}px + ${theme.spacing.xs})`};
  z-index: 2;
  max-width: 40ch;
`

const Message = styled.p`
  margin: 0;
`
