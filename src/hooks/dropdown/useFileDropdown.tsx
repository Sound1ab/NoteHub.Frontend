import React, { useState } from 'react'

import { ITreeNode } from '../../types'
import { removeLastSlug } from '../../utils/removeLastSlug'
import { useFileTree } from '../fileTree/useFileTree'
import { useLoading } from '../utils/useLoading'

export function useFileDropdown(node: ITreeNode) {
  const { loading, withLoading } = useLoading()
  const [isRenaming, setIsRenaming] = useState(false)
  const {
    actions: { deleteFile, renameNode },
  } = useFileTree()

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsRenaming(true)
  }

  function handleSetIsRenamingClose() {
    setIsRenaming(false)
  }

  const handleDeleteFile = withLoading(async () => {
    await deleteFile(node.path)
  })

  const handleRename = withLoading(async (value: string) => {
    const pathWithoutFilename = removeLastSlug(node.path)

    const newPath =
      pathWithoutFilename.length > 0
        ? `${pathWithoutFilename.join('/')}/${value}.md`
        : `${value}.md`

    await renameNode(node.path, newPath)
  })

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

  return { items, isRenaming, handleSetIsRenamingClose, handleRename, loading }
}
