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
      title: 'Add italic',
      isDisabled: !isMarkdownEditorActive,
      icon: 'italic' as const,
      separator: false,
    },
    {
      onClick: toggleBold,
      title: 'Add bold',
      isDisabled: !isMarkdownEditorActive,
      icon: 'bold' as const,
      separator: false,
    },
    {
      onClick: toggleBlockquote,
      title: 'Add quote',
      isDisabled: !isMarkdownEditorActive,
      icon: 'quote-right' as const,
      separator: false,
    },
    {
      onClick: toggleOrderedList,
      title: 'Add ordered list',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list-ol' as const,
      separator: false,
    },
    {
      onClick: toggleUnorderedList,
      title: 'Add unordered list',
      isDisabled: !isMarkdownEditorActive,
      icon: 'list' as const,
      separator: false,
    },
    {
      onClick: toggleCodeBlock,
      title: 'Add code block',
      isDisabled: !isMarkdownEditorActive,
      icon: 'code' as const,
      separator: false,
    },
    {
      onClick: drawHorizontalRule,
      title: 'Add horizontal line',
      isDisabled: !isMarkdownEditorActive,
      icon: 'minus' as const,
      separator: false,
    },
    {
      onClick: drawTable,
      title: 'Add table',
      isDisabled: !isMarkdownEditorActive,
      icon: 'table' as const,
      separator: false,
    },
    {
      onClick: drawLink,
      title: 'Add link',
      isDisabled: !isMarkdownEditorActive,
      icon: 'link' as const,
      separator: true,
    },
    {
      onClick: openFileDialog,
      title: 'Upload an image',
      isDisabled: !isMarkdownEditorActive,
      icon: 'image' as const,
      separator: false,
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
            }))}
            onClose={() => setOpen(false)}
          />
        </Portal>
      </Fade>
    </>
  )
}
