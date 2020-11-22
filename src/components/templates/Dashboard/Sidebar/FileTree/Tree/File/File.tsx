import React, { useState } from 'react'

import { CONTAINER_ID } from '../../../../../../../enums'
import { useDeleteFile, useFileTree } from '../../../../../../../hooks'
import styled from 'styled-components'
import { ITreeNode } from '../../../../../../../types'
import {
  removeMarkdownExtension,
  scrollIntoView,
} from '../../../../../../../utils'
import { Node_Type } from '../../../../../../apollo'
import { ErrorToast, Icon } from '../../../../../../atoms'
import { localState } from '../../../../../../providers/ApolloProvider/cache'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFile {
  node: ITreeNode
  level: number
}

export function File({ node, level }: IFile) {
  const [isRenaming, setIsRenaming] = useState(false)
  const [deleteFile] = useDeleteFile()
  const { path, type, name } = node
  const { activePath, onClick } = useFileTree()
  const isActive = path === activePath

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsRenaming(true)
  }

  async function handleDeleteFile() {
    try {
      await deleteFile(node)
    } catch (error) {
      ErrorToast(`There was an issue deleting your file. ${error}`)
    }
  }

  const dropdownItems = [
    {
      icon: 'trash' as const,
      label: 'Delete file',
      onClick: handleDeleteFile,
    },
    {
      icon: 'pen' as const,
      label: 'Rename',
      onClick: handleSetIsRenamingOpen,
    },
  ]

  function handleOnClick() {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    onClick(path)

    localState.currentPathVar(path)
  }

  return isRenaming ? (
    <FileInput
      node={node}
      onClickOutside={() => setIsRenaming(false)}
      action="rename"
      startingText={removeMarkdownExtension(name)}
    />
  ) : (
    <Node
      node={node}
      level={level}
      onClick={handleOnClick}
      isActive={isActive}
      dropdownItems={dropdownItems}
    >
      <StyledIcon size="sm" icon="file" />
    </Node>
  )
}

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`
