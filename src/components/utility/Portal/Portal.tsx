import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import FocusLock from 'react-focus-lock'
import { css } from 'styled-components'

import { useClickOutside } from '../../../hooks'
import { styled } from '../../../theme'

const Style = styled.div<
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

  .Portal-focus-lock {
    position: relative;
    z-index: 1;
  }

  .Portal-click-layer {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`

export interface IPortal {
  children?: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  domNode?: HTMLElement | null
  hasBackground?: boolean
  className?: string
  placementAroundContainer?: 'bottom-left' | 'bottom-right'
}

export const Portal = React.forwardRef(
  (
    {
      children,
      setOpen,
      domNode,
      hasBackground = false,
      className,
      placementAroundContainer,
    }: IPortal,
    ref?: React.Ref<HTMLElement>
  ) => {
    useClickOutside(() => setOpen(false), ref)

    return ReactDOM.createPortal(
      <Style
        className={className}
        hasBackground={hasBackground}
        placementAroundContainer={placementAroundContainer}
      >
        <div className="Portal-click-layer" />
        <FocusLock className="Portal-focus-lock">{children}</FocusLock>
      </Style>,
      domNode ?? document.body
    )
  }
)
