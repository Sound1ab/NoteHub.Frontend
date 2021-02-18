import React, { ReactNode } from 'react'
import styled from 'styled-components'

interface IConfiguration {
  children: ReactNode
}

export function Configuration({ children }: IConfiguration) {
  return (
    <Wrapper>
      <InnerWrapper>{children}</InnerWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--background-primary);
  flex: 1 1 100%;
  padding: ${({ theme }) => theme.spacing.xs};
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 90ch;
  width: 100%;
  height: 100%;
`
