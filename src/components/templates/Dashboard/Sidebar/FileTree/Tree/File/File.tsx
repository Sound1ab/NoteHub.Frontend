import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { useFileDropdown } from '../../../../../../../hooks/dropdown/useFileDropdown'
import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { ITreeNode } from '../../../../../../../types'
import { removeLastSlug } from '../../../../../../../utils/removeLastSlug'
import { removeMarkdownExtension } from '../../../../../../../utils/removeMarkdownExtension'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { ErrorToast } from '../../../../../../atoms/Toast/Toast'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFile {
  node: ITreeNode
  level: number
}

export function File({ node, level }: IFile) {
  const { items, isRenaming, handleSetIsRenamingClose } = useFileDropdown(node)
  const [{ renameNode, fileClick }, { loading, error }] = useFileTree()
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'NODE', file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const { path, name } = node

  if (error) {
    ErrorToast(error)
  }

  async function handleFileClick() {
    fileClick(path)
  }

  async function handleRename(value: string) {
    const pathWithoutFilename = removeLastSlug(path)

    const newPath =
      pathWithoutFilename.length > 0
        ? `${pathWithoutFilename.join('/')}/${value}.md`
        : `${value}.md`

    await renameNode(path, newPath)
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
