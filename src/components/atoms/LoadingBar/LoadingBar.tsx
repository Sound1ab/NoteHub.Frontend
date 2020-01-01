import React from 'react'
import { css } from 'styled-components'

import { useCommand } from '../../../hooks'
import { styled } from '../../../theme'

const Style = styled.div<{ isLoading: boolean }>`
  position: relative;
  grid-area: loadingBar;
  bottom: 0;
  width: calc(100% + 35px);
  height: ${({ theme }) => theme.spacing.xxxs};
  transition: transform 0.3s ease-in-out;
  transform: translateX(-35px);
  background: repeating-linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.border},
    ${({ theme }) => theme.colors.border} 2px,
    ${({ theme }) => theme.colors.background.tertiary} 0,
    ${({ theme }) => theme.colors.background.tertiary} 4px
  );
  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: slidein 0.6s linear infinite;
    `};

  @keyframes slidein {
    from {
      transform: translateX(-35px);
    }
    to {
      transform: translateX(0);
    }
  }
`

export function LoadingBar() {
  const { loading } = useCommand()

  return <Style isLoading={loading} />
}
