import React from 'react'

import { ITreeNode } from '../../../../../../types'
import { isFolderNode } from '../../../../../../utils'
import { List } from '../../../../../atoms'
import { File } from './File/File'
import { Folder } from './Folder/Folder'

interface INode {
  node: ITreeNode
  level?: number
}

export function Tree({ node, level = 0 }: INode) {
  return isFolderNode(node) ? (
    <Folder
      node={node}
      level={level}
      childNodes={
        <List>
          {node.toggled &&
            node.children?.map((childNode) => (
              <Tree
                key={`${childNode.path}/${childNode.name}`}
                node={childNode}
                level={level + 1}
              />
            ))}
        </List>
      }
    />
  ) : (
    <File node={node} level={level} />
  )
}
