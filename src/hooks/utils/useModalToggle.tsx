import React, { RefObject, useRef, useState } from 'react'

import { IPortal } from '../../components/atoms/Portal/Portal'
import { Portal } from '../../components/atoms/Portal/Portal'
import { useTheme } from '../context/useTheme'

export function useModalToggle<T extends HTMLElement>(
  origin?: RefObject<HTMLElement>
) {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<T | null>(null)
  const theme = useTheme()

  let position: Record<string, string>

  if (origin?.current) {
    const { bottom, right } = origin.current.getBoundingClientRect()

    const positionFromRight = window.innerWidth - right

    position = {
      paddingTop: theme.spacing.xxs,
      top: `${bottom}px`,
      right: `${positionFromRight}px`,
      position: 'absolute',
    }
  }

  const PartiallyAppliedPortal = ({
    children,
    domNode,
    hasBackground,
    placementAroundContainer,
    style,
  }: Pick<
    IPortal,
    | 'children'
    | 'domNode'
    | 'hasBackground'
    | 'placementAroundContainer'
    | 'style'
  >) => (
    <Portal
      ref={ref}
      setOpen={setOpen}
      domNode={domNode}
      hasBackground={hasBackground}
      placementAroundContainer={placementAroundContainer}
      style={position ? position : style}
    >
      {children}
    </Portal>
  )

  return {
    isOpen,
    setOpen,
    ref,
    Portal: PartiallyAppliedPortal,
  }
}
