import React, { useRef, useState } from 'react'

import { IPortal, Portal } from '../../components/atoms'

export function useModalToggle<T extends HTMLElement>() {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<T | null>(null)

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
      style={style}
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
