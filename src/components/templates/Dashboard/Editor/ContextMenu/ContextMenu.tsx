import React, { RefObject } from 'react'

import { useContextMenu, useContextMenuDropdown } from '../../../../../hooks'
import { Fade } from '../../../../animation'
import { Dropdown } from '../../../../atoms'

interface IContextMenu {
  targetRef: RefObject<HTMLElement>
}

export function ContextMenu({ targetRef }: IContextMenu) {
  const { isOpen, Portal, ref, setOpen } = useContextMenu(targetRef)
  const { items, Dropzone } = useContextMenuDropdown()

  if (!items) {
    return null
  }

  return (
    <>
      <Dropzone />
      <Fade show={isOpen}>
        <Portal>
          <Dropdown
            containerRef={ref}
            hasTriangle={false}
            items={items.map((action) => ({
              heading: action.heading,
              label: action.title,
              icon: action.icon,
              onClick: action.onClick,
              isDisabled: action.isDisabled,
              hasSeparator: action.hasSeparator,
            }))}
            onClose={() => setOpen(false)}
          />
        </Portal>
      </Fade>
    </>
  )
}
