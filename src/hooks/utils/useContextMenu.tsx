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

        if (!ref.current) return

        setClickPosition({ top: `${e.clientY}px`, left: `${e.clientX}px` })
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
