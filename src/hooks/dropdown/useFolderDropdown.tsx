import { useState } from 'react'

import { ITreeNode } from '../../types'
import { useFileTree } from '../fileTree/useFileTree'

export function useFolderDropdown(node: ITreeNode) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const {
    actions: { toggleFolder },
  } = useFileTree()

  function handleSetIsNewFileOpen() {
    setIsNewFileOpen(true)

    toggleFolder(node.path, true)
  }

  function handleSetIsNewFileClose() {
    setIsNewFileOpen(false)
  }

  const items = [
    {
      heading: 'Folder',
      icon: 'edit' as const,
      label: 'Create file',
      onClick: handleSetIsNewFileOpen,
    },
  ]

  return { items, isNewFileOpen, handleSetIsNewFileClose }
}
