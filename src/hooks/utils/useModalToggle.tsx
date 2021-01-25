import React, { RefObject, useEffect, useRef, useState } from 'react'

import { IPortal } from '../../components/atoms/Portal/Portal'
import { Portal } from '../../components/atoms/Portal/Portal'
import { useTheme } from '../context/useTheme'

export function useModalToggle<T extends HTMLElement>(
  origin?: RefObject<HTMLElement>
) {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<T | null>(null)
  const theme = useTheme()
  const [position, setClickPosition] = useState({
    top: '-9999px',
    right: '-9999px',
  })

  useEffect(() => {
    if (!isOpen || !origin?.current || !ref?.current) return

    const { bottom, right } = origin.current.getBoundingClientRect()

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const elementHeight = ref?.current?.scrollHeight

    const yOffset = viewportHeight - (bottom + (elementHeight ?? 0))

    const willDisplayOverYBoundary = yOffset < 0

    const positionFromRight = viewportWidth - right

    const elementYPosition = willDisplayOverYBoundary
      ? bottom - Math.abs(yOffset)
      : bottom

    setClickPosition({
      top: `${elementYPosition}px`,
      right: `${positionFromRight}px`,
    })
  }, [isOpen, setClickPosition, origin])

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
      style={
        position
          ? { ...position, paddingTop: theme.spacing.xxs, position: 'fixed' }
          : style
      }
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
