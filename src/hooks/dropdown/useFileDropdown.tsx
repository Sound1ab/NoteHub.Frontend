import React, { useState } from 'react'

import { ITreeNode } from '../../types'
import { useFileTree } from '../fileTree/useFileTree'

export function useFileDropdown(node: ITreeNode) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [{ deleteFile }] = useFileTree()

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsRenaming(true)
  }

  function handleSetIsRenamingClose() {
    setIsRenaming(false)
  }

  async function handleDeleteFile() {
    await deleteFile(node.path)
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
      onClick: handleDeleteFile,
    },
  ]

  return { items, isRenaming, handleSetIsRenamingClose }
}
