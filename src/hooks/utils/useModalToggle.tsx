import React, { RefObject, useEffect, useRef, useState } from 'react'

import { IPortal } from '../../components/atoms/Portal/Portal'
import { Portal } from '../../components/atoms/Portal/Portal'
import { useTheme } from '../context/useTheme'

interface IUseModalToggle {
  origin?: RefObject<HTMLElement>
  placement?: 'top' | 'bottom'
  hasTopPadding?: boolean
}

export function useModalToggle<T extends HTMLElement>({
  origin,
  placement = 'bottom',
  hasTopPadding = true,
}: IUseModalToggle) {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<T | null>(null)
  const theme = useTheme()
  const [position, setClickPosition] = useState({
    top: '-9999px',
    right: '-9999px',
  })

  useEffect(() => {
    if (!isOpen || !origin?.current || !ref?.current) return

    const { bottom, right, top } = origin.current.getBoundingClientRect()

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const elementHeight = ref?.current?.scrollHeight

    const startingPosition = placement === 'bottom' ? bottom : top

    const yOffset = viewportHeight - (startingPosition + (elementHeight ?? 0))

    const willDisplayOverYBoundary = yOffset < 0

    const positionFromRight = viewportWidth - right

    const elementYPosition = willDisplayOverYBoundary
      ? startingPosition - Math.abs(yOffset)
      : startingPosition

    setClickPosition({
      top: `${elementYPosition}px`,
      right: `${positionFromRight}px`,
    })
  }, [isOpen, setClickPosition, origin, placement])

  const PartiallyAppliedPortal = ({
    children,
    domNode,
    hasBackground,
    placementAroundContainer,
    style,
  }: Omit<IPortal, 'setOpen'>) => (
    <Portal
      ref={ref}
      setOpen={setOpen}
      domNode={domNode}
      hasBackground={hasBackground}
      placementAroundContainer={placementAroundContainer}
      style={
        position
          ? {
              ...position,
              ...(hasTopPadding && { paddingTop: theme.spacing.xxs }),
              position: 'fixed',
            }
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
