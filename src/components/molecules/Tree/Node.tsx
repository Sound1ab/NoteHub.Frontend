import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef, useState } from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useDeleteFile, useModalToggle } from '../../../hooks'
import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { scrollIntoView } from '../../../utils'
import { Node_Type } from '../../apollo/generated_components_typings'
import { Dropdown, Icon } from '../../atoms'
import { FileInput } from '..'

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

const Chevron = styled(Icon)<{ toggled: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`

const Item = styled.li`
  position: relative;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.xxs};
  padding-bottom: ${({ theme }) => theme.spacing.xxs};
  padding-right: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  user-select: none;

  .Node-icon-chevron {
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    margin: 0 0 0 ${({ theme }) => theme.spacing.xs};
    flex: 0 0 auto;
  }

  .Node-heading {
    flex: 1;
  }

  .Node-dropdown {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    transform: translateY(100%);
  }
`

interface INode {
  node: ITreeNode
  onToggle: (tree: ITreeNode) => void
}

export function Node({ node, onToggle }: INode) {
  const client = useApolloClient()
  const [deleteFile] = useDeleteFile()
  const containerRef = useRef(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle()
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { type, toggled, name, children, path } = node

  function handleSetIsNewFileOpen() {
    setIsNewFileOpen(true)
    setOpen(false)
  }

  function handleToggleMenu() {
    setOpen(isOpen => !isOpen)
  }

  function onClick(node: ITreeNode) {
    if (node.type === Node_Type.File) {
      client.writeData({
        data: { currentFileName: node.name },
      })

      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    client.writeData({
      data: { currentPath: node.path },
    })
  }

  const dropdownItems =
    node.type === Node_Type.File
      ? [
          {
            icon: 'trash' as const,
            prefix: 'fa' as const,
            label: 'Delete file',
            onClick: () => deleteFile(node.path),
          },
        ]
      : [
          {
            icon: 'edit' as const,
            prefix: 'fa' as const,
            label: 'Create file',
            onClick: handleSetIsNewFileOpen,
          },
        ]

  return (
    <Style>
      <Item ref={containerRef}>
        {type === Node_Type.Folder && (
          <Chevron
            onClick={() => onToggle(node)}
            toggled={toggled}
            size="xs"
            icon="chevron-right"
            prefix="fa"
            marginRight
          />
        )}
        {type === Node_Type.Folder ? (
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
            marginLeft
            className="Node-chevron"
          />
        )}
        <h5 onClick={() => onClick(node)} className="Node-heading">
          {name}
        </h5>
        <Icon
          className="Node-icon-chevron"
          icon="ellipsis-h"
          onClick={handleToggleMenu}
          isDisabled={isOpen}
          ariaLabel="dropdown"
        />
        {isOpen && (
          <Portal domNode={containerRef.current} className="Node-dropdown">
            <Dropdown ref={ref} items={dropdownItems} />
          </Portal>
        )}
      </Item>
      {toggled &&
        children &&
        children.map(node => (
          <Node node={node} onToggle={onToggle} key={name} />
        ))}
      {isNewFileOpen && (
        <FileInput path={path} onClickOutside={() => setIsNewFileOpen(false)} />
      )}
    </Style>
  )
}
