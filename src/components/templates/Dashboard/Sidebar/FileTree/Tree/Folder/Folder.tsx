import React, { MouseEvent, ReactNode, useState } from 'react'
import { useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'

import { useFileTree } from '../../../../../../../hooks'
import { ITreeNode } from '../../../../../../../types'
import { Icon } from '../../../../../../atoms'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFolder {
  node: ITreeNode
  level: number
  childNodes: ReactNode
}

export function Folder({ level, node, childNodes }: IFolder) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const {
    activePath,
    onToggle,
    onCreate,
    loading,
    onMove,
    onChevronClick,
    onFolderClick,
  } = useFileTree()
  const { path, toggled = false } = node

  const isActive = path === activePath

  const [{ isOver }, dropRef] = useDrop<
    { type: string; file: ITreeNode },
    Promise<void>,
    { isOver: boolean }
  >({
    accept: 'NODE',
    drop: handleMove,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  })

  function handleSetIsNewFileOpen() {
    setIsNewFileOpen(true)

    onToggle(path, true)
  }

  const dropdownItems = [
    {
      heading: 'Folder',
      icon: 'edit' as const,
      label: 'Create file',
      onClick: handleSetIsNewFileOpen,
    },
  ]

  async function handleMove({ file }: { file: ITreeNode }) {
    await onMove(file, path, isOver)
  }

  return (
    <>
      <StyledFolder
        node={node}
        level={level}
        dropdownItems={dropdownItems}
        onClick={() => onFolderClick(node)}
        isActive={isActive}
        childNodes={childNodes}
        dndRef={dropRef}
        isOver={isOver}
      >
        <>
          <Chevron
            toggled={toggled}
            size="1x"
            icon="chevron-right"
            aria-label="chevron"
            onClick={(e: MouseEvent<HTMLElement>) => onChevronClick(e, node)}
          />
          <StyledIcon size="1x" icon="folder" />
        </>
      </StyledFolder>
      {isNewFileOpen && (
        <FileInput
          onClickOutside={() => setIsNewFileOpen(false)}
          onSubmit={(name) => onCreate(`${path}/${name}.md`)}
          isDisabled={loading}
        />
      )}
    </>
  )
}

const StyledFolder = styled(Node)<{ isOver: boolean }>`
  background-color: ${({ isOver, theme }) =>
    isOver
      ? css`
          ${theme.colors.accent}!important;
        `
      : 'transparent'};
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Chevron = styled(StyledIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`
