import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { useFileTree } from '../../../../../../../hooks'
import { ITreeNode } from '../../../../../../../types'
import { removeMarkdownExtension } from '../../../../../../../utils'
import { Icon } from '../../../../../../atoms'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFile {
  node: ITreeNode
  level: number
}

export function File({ node, level }: IFile) {
  const [isRenaming, setIsRenaming] = useState(false)
  const { path, type, name } = node
  const {
    activePath,
    onDeleteFile,
    onFileClick,
    onRename,
    loading,
  } = useFileTree()
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'NODE', file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const isActive = path === activePath

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsRenaming(true)
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
      onClick: () => onDeleteFile(node),
    },
  ]

  return isRenaming ? (
    <FileInput
      onClickOutside={() => setIsRenaming(false)}
      onSubmit={(name) => onRename(node, name)}
      startingText={removeMarkdownExtension(name)}
      isDisabled={loading}
    />
  ) : (
    <StyledFile
      node={node}
      level={level}
      onClick={() => onFileClick(type, path)}
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
