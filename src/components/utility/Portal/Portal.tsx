import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { css } from 'styled-components'
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
    useEffect(() => {
      if (typeof ref === 'function') return

      const closeMenu = (event: MouseEvent) => {
        if (!ref || ref.current?.contains(event.target as Element)) {
          return
        }
        setOpen(false)
      }

      document.addEventListener('mousedown', closeMenu)
      return () => {
        document.removeEventListener('mousedown', closeMenu)
      }
    }, [ref, setOpen])

    return ReactDOM.createPortal(
      <Style className={className} hasBackground={hasBackground}>
        {children}
      </Style>,
      domNode ?? document.body
    )
  }
)
