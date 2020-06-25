import React, { useState } from 'react'

import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { Node_Type } from '../../apollo/generated_components_typings'
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
  onToggle: (path: string, toggled: boolean) => void
  level?: number
}

export function Node({ node, onToggle, level = 0 }: INode) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { toggled, children, path, type } = node

  if (type === Node_Type.Folder && children?.length === 0 && path !== '') {
    return null
  }

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
        <FileInput
          path={path}
          onClickOutside={() => setIsNewFileOpen(false)}
          onToggle={onToggle}
        />
      )}
    </Style>
  )
}
