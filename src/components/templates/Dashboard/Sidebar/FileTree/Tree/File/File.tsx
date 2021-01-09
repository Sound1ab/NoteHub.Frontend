import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../../../../enums'
import { useFileTree } from '../../../../../../../hooks/context/useFileTree'
import { useFileDropdown } from '../../../../../../../hooks/dropdown/useFileDropdown'
import { useActivePath } from '../../../../../../../hooks/recoil/useActivePath'
import { useTabs } from '../../../../../../../hooks/recoil/useTabs'
import { ITreeNode } from '../../../../../../../types'
import { removeMarkdownExtension } from '../../../../../../../utils/removeMarkdownExtension'
import { scrollIntoView } from '../../../../../../../utils/scrollIntoView'
import { Node_Type } from '../../../../../../apollo/generated_components_typings'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFile {
  node: ITreeNode
  level: number
}

export function File({ node, level }: IFile) {
  const { items, isRenaming, handleSetIsRenamingClose } = useFileDropdown(node)
  const { onRename, loading } = useFileTree()
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'NODE', file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const [, setActivePath] = useActivePath()
  const [tabs, setTabs] = useTabs()

  const { path, type, name } = node

  async function handleFileClick(type: Node_Type, path: string) {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    setActivePath(path)

    setTabs(new Set(tabs.add(path)))
  }

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
      onClick={() => handleFileClick(type, path)}
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
