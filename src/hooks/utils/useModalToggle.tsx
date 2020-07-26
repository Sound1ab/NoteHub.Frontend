import React, { useRef, useState } from 'react'

import { IPortal, Portal } from '../../components/utility'

export function useModalToggle() {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<any | null>(null)

  const PartiallyAppliedPortal = ({
    children,
    domNode,
    hasBackground,
    className,
    placementAroundContainer,
  }: Pick<
    IPortal,
    | 'children'
    | 'domNode'
    | 'hasBackground'
    | 'className'
    | 'placementAroundContainer'
  >) => (
    <Portal
      ref={ref}
      setOpen={setOpen}
      domNode={domNode}
      hasBackground={hasBackground}
      className={className}
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
