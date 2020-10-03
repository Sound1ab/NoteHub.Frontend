import React from 'react'

import { ITreeNode } from '../../../types'
import { Node_Type } from '../../apollo/generated_components_typings'
import { List } from '../../atoms'
import { File } from '../../atoms/NodeItem/File'
import { Folder } from '../../atoms/NodeItem/Folder'

interface INode {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  level?: number
}

export function Tree({ node, onToggle, level = 0 }: INode) {
  const { toggled, children, path, type } = node

  if (type === Node_Type.Folder && children?.length === 0 && path !== '') {
    return null
  }

  const childNodes =
    children && children?.length > 0
      ? children.map((childNode) => (
          <Tree
            node={childNode}
            onToggle={onToggle}
            key={`${childNode.path}/${childNode.name}`}
            level={level + 1}
          />
        ))
      : []

  return type === Node_Type.Folder ? (
    <Folder
      node={node}
      onToggle={onToggle}
      level={level}
      childNodes={<List>{toggled && childNodes}</List>}
    />
  ) : (
    <File node={node} onToggle={onToggle} level={level} />
  )
}
