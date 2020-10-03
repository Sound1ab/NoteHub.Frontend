import React, { ReactNode, useState } from 'react'

import { useReadCurrentPath } from '../../../hooks'
import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { FileInput } from '../../molecules'
import { NodeItem } from './NodeItem'
import { Icon } from '..'

interface IFolder {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  level: number
  childNodes: ReactNode
}

export function Folder({ level, node, onToggle, childNodes }: IFolder) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { path, toggled } = node
  const { currentPath } = useReadCurrentPath()
  const isActive = currentPath === node.path

  function onChevronClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: ITreeNode
  ) {
    e.stopPropagation()
    onToggle(node.path, !node.toggled)
  }

  function handleSetIsNewFileOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsNewFileOpen(true)
    onToggle(node.path, true)
  }

  const dropdownItems = [
    {
      icon: 'edit' as const,
      prefix: 'fa' as const,
      label: 'Create file',
      onClick: handleSetIsNewFileOpen,
    },
  ]

  function onClick() {
    if (isActive) {
      onToggle(node.path, !node.toggled)
    } else {
      onToggle(node.path, true)
    }
  }

  return (
    <>
      <NodeItem
        node={node}
        level={level}
        dropdownItems={dropdownItems}
        onClick={onClick}
        childNodes={childNodes}
      >
        <>
          <Chevron
            toggled={toggled}
            size="sm"
            icon="chevron-right"
            prefix="fa"
            aria-label="chevron"
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              onChevronClick(e, node)
            }
          />
          <StyledIcon size="sm" icon="folder" prefix="fa" />
        </>
      </NodeItem>
      {isNewFileOpen && (
        <FileInput
          path={path}
          onClickOutside={() => setIsNewFileOpen(false)}
          onToggle={onToggle}
          action="create"
        />
      )}
    </>
  )
}

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Chevron = styled(StyledIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`
