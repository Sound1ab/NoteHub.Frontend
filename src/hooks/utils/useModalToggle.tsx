import React, { useState, useRef } from 'react'
import { Portal, IPortal } from '../../components/utility'

export function useModalToggle() {
  const [isOpen, setOpen] = useState(false)
  const ref = useRef<any | null>(null)

  const PartiallyAppliedPortal = ({
    children,
    domNode,
    hasBackground,
    className,
  }: Pick<IPortal, 'children' | 'domNode' | 'hasBackground' | 'className'>) => (
    <Portal
      ref={ref}
      setOpen={setOpen}
      domNode={domNode}
      hasBackground={hasBackground}
      className={className}
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
