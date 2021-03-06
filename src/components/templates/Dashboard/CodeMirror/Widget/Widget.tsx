import React from 'react'
import styled from 'styled-components'

import { useWidget } from '../../../../../hooks/recoil/useWidget'

type Coords = { left: number; right: number; top: number; bottom: number }

export function Widget() {
  const [widget] = useWidget()

  if (!widget?.coords || !widget.message) {
    return null
  }

  const { message, coords } = widget

  return (
    <Wrapper position={coords}>
      <Message>{message}</Message>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ position: Coords }>`
  position: absolute;
  background-color: var(--background-secondary);
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.xxs};
  margin-top: ${({ theme }) => theme.spacing.s};
  top: ${({ position }) => `${position?.top ?? -9999}px`};
  left: ${({ position, theme }) =>
    `calc(${position?.left ?? -9999}px + ${theme.spacing.xs})`};
  z-index: 10;
  max-width: 40ch;
  box-shadow: ${({ theme }) => theme.boxShadow};
`

const Message = styled.p`
  margin: 0;
`
