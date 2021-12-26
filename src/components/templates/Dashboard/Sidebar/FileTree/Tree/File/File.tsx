import React, { useState } from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { useFileDropdown } from '../../../../../../../hooks/dropdown/useFileDropdown'
import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { ITreeNode } from '../../../../../../../types'
import { removeLastSlug } from '../../../../../../../utils/removeLastSlug'
import { removeMarkdownExtension } from '../../../../../../../utils/removeMarkdownExtension'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFile {
  node: ITreeNode
  level: number
}

function useLoading() {
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function withLoading<T extends any[]>(callback: (...args: T) => any) {
    return async (...args: T) => {
      setLoading(true)
      await callback(...args)
      setLoading(false)
    }
  }

  return {
    loading,
    withLoading,
  }
}

export function File({ node, level }: IFile) {
  const { loading, withLoading } = useLoading()
  const { items, isRenaming, handleSetIsRenamingClose } = useFileDropdown(node)
  const {
    actions: { renameNode, fileClick },
  } = useFileTree()
  const [{ isDragging }, dragRef] = useDrag({
    type: 'NODE',
    item: { file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // if (loading) {
  //   return
  // }

  const { path, name } = node

  async function handleFileClick() {
    fileClick(path)
  }

  const handleRename = withLoading(async (value: string) => {
    const pathWithoutFilename = removeLastSlug(path)

    const newPath =
      pathWithoutFilename.length > 0
        ? `${pathWithoutFilename.join('/')}/${value}.md`
        : `${value}.md`

    await renameNode(path, newPath)
  })

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
