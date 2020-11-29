import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../../../../enums'
import { useDeleteFile, useFileTree } from '../../../../../../../hooks'
import { useMoveFile } from '../../../../../../../hooks/file/useMoveFile'
import { ITreeNode } from '../../../../../../../types'
import {
  removeLastSlug,
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
  const { activePath, onClick, openFoldersInPath } = useFileTree()
  const isActive = path === activePath
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'NODE', file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const [moveFile, { loading }] = useMoveFile()

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

  function handleOnClick() {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    onClick(path)

    localState.currentPathVar(path)
  }

  async function handleRename(name: string) {
    const path = removeLastSlug(node.path)

    const newPath = path.length > 0 ? `${path}/${name}.md` : `${name}.md`

    openFoldersInPath(newPath)

    try {
      await moveFile(node, newPath)
    } catch {
      ErrorToast('Could not move file')
    }
  }

  return isRenaming ? (
    <FileInput
      onClickOutside={() => setIsRenaming(false)}
      onSubmit={handleRename}
      startingText={removeMarkdownExtension(name)}
      isDisabled={loading}
    />
  ) : (
    <StyledFile
      node={node}
      level={level}
      onClick={handleOnClick}
      isActive={isActive}
      dropdownItems={dropdownItems}
      dndRef={dragRef}
      isDragging={isDragging}
    >
      <StyledIcon size="sm" icon="file" />
    </StyledFile>
  )
}

const StyledFile = styled(Node)<{ isDragging: boolean }>`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`
