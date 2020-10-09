import React, { ReactNode, useState } from 'react'

import { useFileTree } from '../../../../../../../hooks'
import { styled } from '../../../../../../../theme'
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
  const { path, toggled } = node
  const { activePath, onClick, onToggle } = useFileTree()
  const isActive = path === activePath

  function onChevronClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: ITreeNode
  ) {
    e.stopPropagation()
    onToggle(node.path, !node.toggled)

    onClick(path)
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

  function handleOnClick() {
    if (isActive) {
      onToggle(node.path, !node.toggled)
    } else {
      onToggle(node.path, true)
    }

    onClick(path)
  }

  return (
    <>
      <Node
        node={node}
        level={level}
        dropdownItems={dropdownItems}
        onClick={handleOnClick}
        isActive={isActive}
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
      </Node>
      {isNewFileOpen && (
        <FileInput
          path={path}
          onClickOutside={() => setIsNewFileOpen(false)}
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
