import React, { useState } from 'react'

import { useFileTree } from '..'
import { ITreeNode } from '../../types'

export function useFileDropdown(node: ITreeNode) {
  const [isRenaming, setIsRenaming] = useState(false)
  const { onDeleteFile } = useFileTree()

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsRenaming(true)
  }

  function handleSetIsRenamingClose() {
    setIsRenaming(false)
  }

  const items = [
    {
      heading: 'File',
      icon: 'pen' as const,
      label: 'Rename',
      onClick: handleSetIsRenamingOpen,
      hasSeparator: true,
    },
    {
      icon: 'trash' as const,
      label: 'Delete',
      onClick: () => onDeleteFile(node),
    },
  ]

  return { items, isRenaming, handleSetIsRenamingClose }
}
