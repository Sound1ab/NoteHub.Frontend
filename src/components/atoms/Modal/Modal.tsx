import React, { ReactNode, RefObject } from 'react'
import styled from 'styled-components'

interface IModal {
  children: ReactNode
  className?: string
  modalRef?: RefObject<HTMLDivElement>
}

export function Modal({ children, className, modalRef }: IModal) {
  return (
    <Wrapper className={className} ref={modalRef}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: var(--background-primary);
  display: flex;
  flex-direction: column;
`
