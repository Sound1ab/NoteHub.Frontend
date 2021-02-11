import React, { RefObject } from 'react'

import { useContextMenuDropdown } from '../../../../../hooks/dropdown/useContextMenuDropdown'
import { useContextMenu } from '../../../../../hooks/utils/useContextMenu'
import { Fade } from '../../../../animation/Mount/Fade'
import { Dropdown } from '../../../../atoms/Dropdown/Dropdown'
import { Portal } from '../../../../atoms/Portal/Portal'

interface IContextMenu {
  target?: RefObject<HTMLElement> | null
}

export function ContextMenu({ target }: IContextMenu) {
  const { isOpen, ref, setOpen, position } = useContextMenu(target)
  const { items, Dropzone } = useContextMenuDropdown()

  if (!items) {
    return null
  }

  return (
    <>
      <Dropzone />
      <Fade show={isOpen}>
        <Portal
          ref={ref}
          setOpen={() => setOpen(false)}
          style={{ ...position, position: 'absolute' }}
        >
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
      </Fade>
    </>
  )
}
