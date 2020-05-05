import React, { useState } from 'react'

import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { NodeItem } from '../../atoms'
import { FileInput } from '../'

const Style = styled.ul`
  position: relative;
  margin: 0;
  list-style: none;

  .Node-heading {
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

interface INode {
  node: ITreeNode
  onToggle: (tree: ITreeNode, toggled: boolean) => void
  level?: number
}

export function Node({ node, onToggle, level = 1 }: INode) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { toggled, children, path } = node

  return (
    <Style>
      <NodeItem
        node={node}
        onToggle={onToggle}
        level={level}
        openFileInput={() => setIsNewFileOpen(true)}
      />
      {toggled &&
        children &&
        children.map(node => (
          <Node
            node={node}
            onToggle={onToggle}
            key={`${node.path}/${node.name}`}
            level={level + 1}
          />
        ))}
      {isNewFileOpen && (
        <FileInput path={path} onClickOutside={() => setIsNewFileOpen(false)} />
      )}
    </Style>
  )
}
