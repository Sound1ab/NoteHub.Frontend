import React, { ReactNode, RefObject, useLayoutEffect, useState } from 'react'

import { useModalToggle } from './useModalToggle'

export function useContextMenu(target?: RefObject<HTMLElement> | null) {
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>({})
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

        if (!ref.current || !target?.current) return

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        const cursorX = e.clientX
        const cursorY = e.clientY

        const elementWidth = ref.current.clientWidth
        const elementHeight = ref.current.clientHeight

        // If the position of the cursor plus the width/height of the menu is
        // greater than the viewport width/height, we know its out of bounds
        const xOffset = viewportWidth - (cursorX + elementWidth)
        const yOffset = viewportHeight - (cursorY + elementHeight)

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
    <Portal style={{ top, left, position: 'fixed' }} domNode={domNode}>
      {children}
    </Portal>
  )

  return {
    isOpen,
    Portal: PartiallyAppliedPortal,
    ref,
    setOpen,
    position: { left, top },
  }
}
