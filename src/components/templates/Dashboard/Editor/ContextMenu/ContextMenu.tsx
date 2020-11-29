import React, { RefObject } from 'react'

import {
  useContextMenu,
  useDropzone,
  useEasyMDE,
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
  const { easyMDE, editor } = useEasyMDE()
  const { openFileDialog, Dropzone } = useDropzone()

  if (!easyMDE || !editor) {
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
  } = easyMDE

  const actions = [
    {
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
      onClick: toggleOrderedList,
      title: 'Ordered list',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list-ol' as const,
    },
    {
      onClick: toggleUnorderedList,
      title: 'Unordered list',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list' as const,
      hasSeparator: true,
    },
    {
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
      hasSeparator: true,
    },
    {
      onClick: drawLink,
      title: 'Link',
      isDisabled: !isMarkdownEditorActive,
      icon: 'link' as const,
    },
    {
      onClick: openFileDialog,
      title: 'Upload an image',
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
            items={actions.map((action) => ({
              label: action.title,
              icon: action.icon,
              onClick: () => action.onClick(editor),
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
