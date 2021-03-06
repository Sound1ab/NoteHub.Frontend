import React, { useEffect, useRef, useState } from 'react'

import { IPortal } from '../../components/atoms/Portal/Portal'
import { Portal } from '../../components/atoms/Portal/Portal'
import { useTheme } from '../context/useTheme'

type Placement = 'top' | 'bottom' | 'right'

interface IUseModalToggle {
  origin?: HTMLElement | Range | null
  placement?: Placement
  hasPadding?: boolean
}

export function useModalToggle<T extends HTMLElement>({
  origin,
  placement = 'bottom',
  hasPadding = true,
}: IUseModalToggle) {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<T | null>(null)
  const theme = useTheme()
  const [position, setClickPosition] = useState({
    top: '0px',
    left: '0px',
  })

  useEffect(() => {
    if (!isOpen || !origin || !ref?.current) return

    const { x, y } = getPosition(origin, placement, ref.current)

    setClickPosition({
      left: `${x}px`,
      top: `${y}px`,
    })
  }, [isOpen, setClickPosition, origin, placement])

  let padding: Record<string, string | number> = {}

  switch (placement) {
    case 'bottom': {
      padding = { paddingTop: theme.spacing.xxs }
      break
    }
    case 'right': {
      padding = { paddingLeft: theme.spacing.xxs }
      break
    }
    case 'top': {
      padding = { paddingBottom: theme.spacing.xxs }
      break
    }
  }

  const PartiallyAppliedPortal = ({
    children,
    domNode,
    hasBackground,
    placementAroundContainer,
  }: Omit<IPortal, 'setOpen'>) => (
    <Portal
      ref={ref}
      setOpen={setOpen}
      domNode={domNode}
      hasBackground={hasBackground}
      placementAroundContainer={placementAroundContainer}
      style={{
        ...position,
        ...(hasPadding && padding),
        position: 'fixed',
      }}
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

function getPosition(
  origin: HTMLElement | Range,
  placement: Placement,
  element: HTMLElement
) {
  const viewportHeight = window.innerHeight

  let x = 0
  let y = 0

  const { bottom, right, top, height } = origin.getBoundingClientRect()

  const elementWidth = element.scrollWidth ?? 0
  const elementHeight = element.scrollHeight ?? 0

  switch (placement) {
    case 'bottom': {
      x = right - elementWidth
      y = bottom
      break
    }
    case 'right': {
      x = right
      y = bottom - height
      break
    }
    case 'top': {
      x = right - elementWidth
      y = top - elementHeight
      break
    }
  }

  const yOffset = viewportHeight - (y + elementHeight)
  const willDisplayOverYBoundary = yOffset < 0

  return {
    x,
    y: willDisplayOverYBoundary ? y - Math.abs(yOffset) : y,
  }
}
