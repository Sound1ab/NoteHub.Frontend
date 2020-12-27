import React from 'react'

import { ITreeNode } from '../../../../../../types'
import { isFolderNode, traverseTree } from '../../../../../../utils/createNodes'
import { Node_Type } from '../../../../../apollo/generated_components_typings'
import { List } from '../../../../../atoms/List/List'
import { File } from './File/File'
import { Folder } from './Folder/Folder'

interface INode {
  node: ITreeNode
  level?: number
}

export function Tree({ node, level = 0 }: INode) {
  // When we delete a file and the folder is empty we want to hide the folder
  if (isFolderNode(node)) {
    let hasFiles = false

    traverseTree(node, (node) => {
      if (node.type === Node_Type.File) {
        hasFiles = true
      }
    })

    if (!hasFiles) {
      return null
    }
  }

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
