import React from 'react'

import { useContextMenuDropdown } from '../../../../../hooks/dropdown/useContextMenuDropdown'
import { useContextMenu } from '../../../../../hooks/utils/useContextMenu'
import { Fade } from '../../../../animation/Mount/Fade'
import { Dropdown } from '../../../../atoms/Dropdown/Dropdown'
import { useEditor } from '../../../../../hooks/codeMirror/useEditor'

export function ContextMenu() {
  const { wrapperRef } = useEditor()
  const { isOpen, Portal, ref, setOpen } = useContextMenu(wrapperRef)
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
              hasSeparator: action.hasSeparator,
            }))}
            onClose={() => setOpen(false)}
          />
        </Portal>
      </Fade>
    </>
  )
}
