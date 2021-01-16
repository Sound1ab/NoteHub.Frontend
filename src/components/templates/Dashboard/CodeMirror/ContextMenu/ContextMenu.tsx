import React, { RefObject } from 'react'

import { useContextMenuDropdown } from '../../../../../hooks/dropdown/useContextMenuDropdown'
import { useContextMenu } from '../../../../../hooks/utils/useContextMenu'
import { Dropdown } from '../../../../atoms/Dropdown/Dropdown'

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
      {isOpen && (
        <Portal>
          <Dropdown
            containerRef={ref}
            hasTriangle={false}
            items={items.map((action) => ({
              heading: action.heading,
              label: action.title,
              icon: action.icon,
              onClick: action.onClick,
              hasSeparator: action.hasSeparator,
            }))}
            onClose={() => setOpen(false)}
          />
        </Portal>
      )}
    </>
  )
}