import React, { useRef, useState } from 'react'

import { IPortal, Portal } from '../../components/atoms'

export function useModalToggle() {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<any | null>(null)

  const PartiallyAppliedPortal = ({
    children,
    domNode,
    hasBackground,
    placementAroundContainer,
  }: Pick<
    IPortal,
    'children' | 'domNode' | 'hasBackground' | 'placementAroundContainer'
  >) => (
    <Portal
      ref={ref}
      setOpen={setOpen}
      domNode={domNode}
      hasBackground={hasBackground}
      placementAroundContainer={placementAroundContainer}
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
