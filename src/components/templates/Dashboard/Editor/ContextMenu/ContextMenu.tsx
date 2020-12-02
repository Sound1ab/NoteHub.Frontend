import React, { RefObject } from 'react'

import {
  useContextMenu,
  useDropzone,
  useCodeMirror,
  useReadCurrentPath,
} from '../../../../../hooks'
import { isFile } from '../../../../../utils'
import { Fade } from '../../../../animation'
import { Dropdown } from '../../../../atoms'

interface IContextMenu {
  targetRef: RefObject<HTMLElement>
}

export function ContextMenu({ targetRef }: IContextMenu) {
  const currentPath = useReadCurrentPath()
  const isMarkdownEditorActive = isFile(currentPath)
  const { isOpen, Portal, ref, setOpen } = useContextMenu(targetRef)
  const { actions } = useCodeMirror()
  const { openFileDialog, Dropzone } = useDropzone()

  if (!actions) {
    return null
  }

  const {
    toggleOrderedList,
    toggleCodeBlock,
    toggleUnorderedList,
    toggleItalic,
    toggleBold,
    toggleBlockquote,
    drawHorizontalRule,
    drawLink,
    drawTable,
  } = actions

  const items = [
    {
      heading: 'Text',
      onClick: toggleItalic,
      title: 'Italic',
      isDisabled: !isMarkdownEditorActive,
      icon: 'italic' as const,
    },
    {
      onClick: toggleBold,
      title: 'Bold',
      isDisabled: !isMarkdownEditorActive,
      icon: 'bold' as const,
    },
    {
      onClick: toggleBlockquote,
      title: 'Quote',
      isDisabled: !isMarkdownEditorActive,
      icon: 'quote-right' as const,
      hasSeparator: true,
    },
    {
      heading: 'List',
      onClick: toggleOrderedList,
      title: 'Ordered',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list-ol' as const,
    },
    {
      onClick: toggleUnorderedList,
      title: 'Unordered',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list' as const,
      hasSeparator: true,
    },
    {
      heading: 'Insert',
      onClick: toggleCodeBlock,
      title: 'Code block',
      isDisabled: !isMarkdownEditorActive,
      icon: 'code' as const,
    },
    {
      onClick: drawHorizontalRule,
      title: 'Horizontal line',
      isDisabled: !isMarkdownEditorActive,
      icon: 'minus' as const,
    },
    {
      onClick: drawTable,
      title: 'Table',
      isDisabled: !isMarkdownEditorActive,
      icon: 'table' as const,
    },
    {
      onClick: drawLink,
      title: 'Link',
      isDisabled: !isMarkdownEditorActive,
      icon: 'link' as const,
    },
    {
      onClick: openFileDialog,
      title: 'Image',
      isDisabled: !isMarkdownEditorActive,
      icon: 'image' as const,
    },
  ]

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
