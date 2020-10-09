import React from 'react'

import { ITreeNode } from '../../../../../../types'
import { Node_Type } from '../../../../../apollo'
import { List } from '../../../../../atoms'
import { File } from './File/File'
import { Folder } from './Folder/Folder'

interface INode {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  onClick: (path: string) => void
  activePath: string
  level?: number
}

export function Tree({
  node,
  onToggle,
  onClick,
  activePath,
  level = 0,
}: INode) {
  const { toggled, children, path, type } = node

  if (type === Node_Type.Folder && children?.length === 0 && path !== '') {
    return null
  }

  const shouldShowChildNodes = toggled && children && children?.length > 0

  return type === Node_Type.Folder ? (
    <Folder
      node={node}
      onToggle={onToggle}
      onClick={onClick}
      activePath={activePath}
      level={level}
      childNodes={
        <List>
          {shouldShowChildNodes &&
            children?.map((childNode) => (
              <Tree
                key={`${childNode.path}/${childNode.name}`}
                node={childNode}
                onToggle={onToggle}
                onClick={onClick}
                activePath={activePath}
                level={level + 1}
              />
            ))}
        </List>
      }
    />
  ) : (
    <File
      node={node}
      onToggle={onToggle}
      onClick={onClick}
      activePath={activePath}
      level={level}
    />
  )
}
