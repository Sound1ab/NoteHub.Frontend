import React, { ReactNode } from 'react'
import {
  Link as ReactRouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom'
import styled, { css } from 'styled-components'

interface ILink {
  children: ReactNode
  to: string
}

export function Link({ children, to }: ILink) {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })

  return (
    <StyledLink to={to} isActive={Boolean(match)}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled(ReactRouterLink)<{ isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--background-secondary);
    `};

  &:hover {
    background-color: var(--background-tertiary);
  }
`
