import React, { useState } from 'react'

import { ITreeNode } from '../../../types'
import { Node_Type } from '../../apollo/generated_components_typings'
import { List, NodeItem } from '../../atoms'
import { FileInput } from '../'

interface INode {
  nodes: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  level?: number
}

export function Tree({ nodes, onToggle, level = 0 }: INode) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { toggled, children, path, type } = nodes

  if (type === Node_Type.Folder && children?.length === 0 && path !== '') {
    return null
  }

  return (
    <>
      <NodeItem
        node={nodes}
        onToggle={onToggle}
        level={level}
        openFileInput={() => setIsNewFileOpen(true)}
      >
        {toggled && children && children?.length > 0 && (
          <List>
            {children.map(childNodes => (
              <Tree
                nodes={childNodes}
                onToggle={onToggle}
                key={`${childNodes.path}/${childNodes.name}`}
                level={level + 1}
              />
            ))}
          </List>
        )}
      </NodeItem>
      {isNewFileOpen && (
        <FileInput
          path={path}
          onClickOutside={() => setIsNewFileOpen(false)}
          onToggle={onToggle}
        />
      )}
    </>
  )
}
