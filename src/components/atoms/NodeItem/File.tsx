import React, { useState } from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useDeleteFile } from '../../../hooks'
import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { scrollIntoView } from '../../../utils'
import { Node_Type } from '../../apollo/generated_components_typings'
import { FileInput } from '../../molecules'
import { NodeItem } from './NodeItem'
import { Icon } from '..'

interface IFile {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  level: number
}

export function File({ node, onToggle, level }: IFile) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [deleteFile] = useDeleteFile()

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsRenaming(true)
  }

  async function handleDeleteFile() {
    try {
      await deleteFile(node.path)
    } catch {
      alert('Could not delete file. Please try again.')
    }
  }

  const dropdownItems = [
    {
      icon: 'trash' as const,
      prefix: 'fa' as const,
      label: 'Delete file',
      onClick: handleDeleteFile,
    },
    {
      icon: 'pen' as const,
      prefix: 'fa' as const,
      label: 'Rename',
      onClick: handleSetIsRenamingOpen,
    },
  ]

  function onClick() {
    if (node.type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }
  }

  return isRenaming ? (
    <FileInput
      path={node.path}
      onClickOutside={() => setIsRenaming(false)}
      onToggle={onToggle}
      action="rename"
    />
  ) : (
    <NodeItem
      node={node}
      level={level}
      onClick={onClick}
      dropdownItems={dropdownItems}
    >
      <StyledIcon size="sm" icon="file" prefix="fa" />
    </NodeItem>
  )
}

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`
