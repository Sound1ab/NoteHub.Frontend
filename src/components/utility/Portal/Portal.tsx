import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import ReactDOM from 'react-dom'
import FocusLock from 'react-focus-lock'
import { css } from 'styled-components'

import { useClickOutside } from '../../../hooks'
import { styled } from '../../../theme'

const Style = styled.div<{ hasBackground: boolean }>`
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
`

export interface IPortal {
  children?: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  domNode?: HTMLElement | null
  hasBackground?: boolean
  className?: string
}

export const Portal = React.forwardRef(
  (
    { children, setOpen, domNode, hasBackground = false, className }: IPortal,
    ref?: React.Ref<HTMLElement>
  ) => {
    useClickOutside(() => setOpen(false), ref)

    return ReactDOM.createPortal(
      <Style className={className} hasBackground={hasBackground}>
        <FocusLock>{children}</FocusLock>
      </Style>,
      domNode ?? document.body
    )
  }
)
