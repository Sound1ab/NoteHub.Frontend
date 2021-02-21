import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface ICard {
  children: ReactNode
  onClick?: () => void
}

export function Card({ children, onClick }: ICard) {
  return <Wrapper onClick={onClick}>{children}</Wrapper>
}

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  border-radius: ${({ theme }) => theme.borderRadius};
  grid-gap: ${({ theme }) => theme.spacing.xs};
  background-color: var(--background-secondary);
  padding: ${({ theme }) => theme.spacing.xs};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`
