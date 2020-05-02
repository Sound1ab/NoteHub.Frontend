import React from 'react'

import { styled } from '../../../theme'
import { Icon } from '../../atoms'
import { ITreeNode } from './types'

const Style = styled.ul`
  position: relative;
  margin: 0;
  list-style: none;
  padding-left: ${({ theme }) => theme.spacing.xs};

  .Node-heading {
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const Chevron = styled(Icon)<Pick<INode, 'toggled'>>`
  color: ${({ theme }) => theme.colors.text.primary};
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`

const Item = styled.li`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.xxs};
  padding-bottom: ${({ theme }) => theme.spacing.xxs};
  padding-right: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  user-select: none;
`

interface INode {
  name: string
  childNodes: any
  toggled: boolean
  onClick: (node: ITreeNode) => void
  node: any
  type: string
  renderNodes: (tree: ITreeNode[]) => void
}

export function Node({
  name,
  childNodes,
  toggled,
  node,
  renderNodes,
  onClick,
  type,
}: INode) {
  return (
    <Style>
      <Item onClick={() => onClick(node)}>
        {type === 'tree' && (
          <Chevron
            toggled={toggled}
            size="xs"
            icon="chevron-right"
            prefix="fa"
            marginRight
          />
        )}
        {type === 'tree' ? (
          <Icon
            size="xs"
            icon="folder"
            prefix="fa"
            marginRight
            className="Node-chevron"
          />
        ) : (
          <Icon
            size="xs"
            icon="file"
            prefix="fa"
            marginRight
            className="Node-chevron"
          />
        )}
        <h5 className="Node-heading">{name}</h5>
      </Item>
      {toggled && childNodes && renderNodes(childNodes)}
    </Style>
  )
}
