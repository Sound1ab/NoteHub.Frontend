import { useApolloClient } from '@apollo/react-hooks'
import React, { useState } from 'react'

import { CONTAINER_ID } from '../../../../../../../enums'
import { useDeleteFile } from '../../../../../../../hooks'
import { styled } from '../../../../../../../theme'
import { ITreeNode } from '../../../../../../../types'
import { scrollIntoView } from '../../../../../../../utils'
import { Node_Type } from '../../../../../../apollo'
import { Icon } from '../../../../../../atoms'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFile {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  onClick: (path: string) => void
  activePath: string
  level: number
}

export function File({ node, onToggle, level, onClick, activePath }: IFile) {
  const client = useApolloClient()
  const [isRenaming, setIsRenaming] = useState(false)
  const [deleteFile] = useDeleteFile()
  const { path, type } = node

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

  function handleOnClick() {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    onClick(path)

    client.writeData({
      data: { currentPath: path },
    })
  }

  return isRenaming ? (
    <FileInput
      path={path}
      onClickOutside={() => setIsRenaming(false)}
      onToggle={onToggle}
      action="rename"
    />
  ) : (
    <Node
      node={node}
      level={level}
      onClick={handleOnClick}
      activePath={activePath}
      dropdownItems={dropdownItems}
    >
      <StyledIcon size="sm" icon="file" prefix="fa" />
    </Node>
  )
}

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`
