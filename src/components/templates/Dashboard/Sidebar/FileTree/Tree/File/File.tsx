import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { useFileDropdown, useFileTree } from '../../../../../../../hooks'
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
  const { items, isRenaming, handleSetIsRenamingClose } = useFileDropdown(node)
  const { onFileClick, onRename, loading } = useFileTree()
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'NODE', file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const { path, type, name } = node

  return isRenaming ? (
    <FileInput
      onClickOutside={handleSetIsRenamingClose}
      onSubmit={(name) => onRename(node, name)}
      startingText={removeMarkdownExtension(name)}
      isDisabled={loading}
    />
  ) : (
    <StyledFile
      node={node}
      level={level}
      onClick={() => onFileClick(type, path)}
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
  color: ${({ theme }) => theme.colors.text.secondary};
`
