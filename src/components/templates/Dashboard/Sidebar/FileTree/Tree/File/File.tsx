import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { useFileDropdown } from '../../../../../../../hooks/dropdown/useFileDropdown'
import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { ITreeNode } from '../../../../../../../types'
import { removeMarkdownExtension } from '../../../../../../../utils/removeMarkdownExtension'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'
import { FileSkeleton } from './FileSkeleton'

interface IFile {
  node: ITreeNode
  level: number
}

export function File({ node, level }: IFile) {
  const { items, isRenaming, handleSetIsRenamingClose, loading, handleRename } =
    useFileDropdown(node)
  const {
    actions: { fileClick },
  } = useFileTree()
  const [{ isDragging }, dragRef] = useDrag({
    type: 'NODE',
    item: { file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  if (loading) {
    return <FileSkeleton />
  }

  const { path, name } = node

  async function handleFileClick() {
    fileClick(path)
  }

  return isRenaming ? (
    <FileInput
      onClickOutside={handleSetIsRenamingClose}
      onSubmit={handleRename}
      startingText={removeMarkdownExtension(name)}
    />
  ) : (
    <StyledFile
      node={node}
      level={level}
      onClick={handleFileClick}
      dropdownItems={items}
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
  color: var(--text-secondary);
`
