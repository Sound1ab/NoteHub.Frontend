import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import FocusLock from 'react-focus-lock'
import { css } from 'styled-components'

import { useClickOutside } from '../../../hooks'
import { styled } from '../../../theme'

export interface IPortal {
  children?: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  domNode?: HTMLElement | null
  hasBackground?: boolean
  placementAroundContainer?: 'bottom-left' | 'bottom-right'
}

export const Portal = React.forwardRef(
  (
    {
      children,
      setOpen,
      domNode,
      hasBackground = false,
      placementAroundContainer,
    }: IPortal,
    ref?: React.Ref<HTMLElement>
  ) => {
    useClickOutside(() => setOpen(false), ref)

    return ReactDOM.createPortal(
      <Wrapper
        hasBackground={hasBackground}
        placementAroundContainer={placementAroundContainer}
      >
        <ClickLayer />
        <StyledFocusLock>{children}</StyledFocusLock>
      </Wrapper>,
      domNode ?? document.body
    )
  }
)

const Wrapper = styled.div<
  Pick<IPortal, 'hasBackground' | 'placementAroundContainer'>
>`
  position: relative;
  ${({ hasBackground }) =>
    hasBackground &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    `};
  ${({ placementAroundContainer }) => {
    switch (placementAroundContainer) {
      case 'bottom-left':
        return css`
          position: absolute;
          top: calc(100% + ${({ theme }) => theme.spacing.xs});
          right: ${({ theme }) => theme.spacing.xs};
          z-index: 100;
        `
      case 'bottom-right':
        return css`
          position: absolute;
          top: calc(100% + ${({ theme }) => theme.spacing.xs});
          left: ${({ theme }) => theme.spacing.xs};
          z-index: 100;
        `
    }
  }};
`

const StyledFocusLock = styled(FocusLock)`
  position: relative;
  z-index: 1;
`

const ClickLayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`
