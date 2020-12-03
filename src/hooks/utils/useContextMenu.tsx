import React, { ReactNode, RefObject, useLayoutEffect, useState } from 'react'

import { useModalToggle } from './useModalToggle'

export function useContextMenu(target: RefObject<HTMLElement>) {
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>()
  const [{ top, left }, setClickPosition] = useState({
    top: '-9999px',
    left: '-9999px',
  })

  useLayoutEffect(() => {
    const handleContextClick = (e: MouseEvent) => {
      const contextContainerClicked = target?.current?.contains(
        e.target as Node
      )
      if (contextContainerClicked) {
        e.preventDefault()
        setOpen(true)

        if (!ref.current || !target.current) return

        const { left, top } = target.current.getBoundingClientRect()

        const cursorX = e.clientX
        const cursorY = e.clientY

        // We need to take into account the head and sidebar as mouse position
        // doesn't do this for us
        const cursorWithinTargetX = e.clientX - left
        const cursorWithinTargetY = e.clientY - top

        const containerWidth = target.current.clientWidth
        const containerHeight = target.current.clientHeight
        const elementWidth = ref.current.clientWidth
        const elementHeight = ref.current.clientHeight

        // Detect if the element is going over the container boundaries
        const xOffset = containerWidth - (elementWidth + cursorWithinTargetX)
        const yOffset = containerHeight - (elementHeight + cursorWithinTargetY)

        const willDisplayOverXBoundary = xOffset < 0
        const willDisplayOverYBoundary = yOffset < 0

        // Move the element within the boundaries of the container
        const elementXPosition = willDisplayOverXBoundary
          ? cursorX - Math.abs(xOffset)
          : cursorX
        const elementYPosition = willDisplayOverYBoundary
          ? cursorY - Math.abs(yOffset)
          : cursorY

        setClickPosition({
          left: `${elementXPosition}px`,
          top: `${elementYPosition}px`,
        })
      }
    }
    window.addEventListener('contextmenu', handleContextClick)
    return () => {
      window.removeEventListener('contextmenu', handleContextClick)
    }
  }, [target, ref, setOpen])

  const PartiallyAppliedPortal = ({
    children,
    domNode,
  }: {
    children: ReactNode
    domNode?: HTMLElement | null
  }) => (
    <Portal style={{ top, left, position: 'absolute' }} domNode={domNode}>
      {children}
    </Portal>
  )

  return { isOpen, Portal: PartiallyAppliedPortal, ref, setOpen }
}
