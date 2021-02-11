import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import { css } from 'styled-components'
import styled from 'styled-components'

import { useClickOutside } from '../../../hooks/utils/useClickOutside'

export interface IPortal {
  children?: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  domNode?: HTMLElement | null
  hasBackground?: boolean
  hasClickLayer?: boolean
  placementAroundContainer?: 'bottom-left' | 'bottom-right'
  style?: Record<string, string | number>
}

export const Portal = React.forwardRef(
  (
    {
      children,
      setOpen,
      domNode,
      hasBackground = false,
      hasClickLayer = true,
      placementAroundContainer,
      style,
    }: IPortal,
    ref?: React.Ref<HTMLElement> | null
  ) => {
    useClickOutside(() => setOpen(false), ref)
    return ReactDOM.createPortal(
      <Wrapper
        hasBackground={hasBackground}
        placementAroundContainer={placementAroundContainer}
        style={style}
      >
        {hasClickLayer && <ClickLayer />}
        {children}
      </Wrapper>,
      domNode ?? document.body
    )
  }
)

const Wrapper = styled.div<
  Pick<IPortal, 'hasBackground' | 'placementAroundContainer'>
>`
  position: relative;
  z-index: 100;
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
    `}
  ${({ placementAroundContainer }) => {
    switch (placementAroundContainer) {
      case 'bottom-left':
        return css`
          position: absolute;
          top: calc(100% + ${({ theme }) => theme.spacing.xxs});
          right: 0;
        `
      case 'bottom-right':
        return css`
          position: absolute;
          top: calc(100% + ${({ theme }) => theme.spacing.xs});
          left: 0;
        `
    }
  }};
`

const ClickLayer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`
