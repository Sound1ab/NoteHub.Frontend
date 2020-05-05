import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef, useState } from 'react'
import { css } from 'styled-components'

import { CONTAINER_ID } from '../../../enums'
import {
  useDeleteFile,
  useModalToggle,
  useReadCurrentPath,
} from '../../../hooks'
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

  .Node-heading {
    margin-bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

const Item = styled.li<{ isActive: boolean; level: number }>`
  position: relative;
  margin: 0;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.secondary : 'transparent'};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
    }
  }

  .Node-button {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    padding-top: ${({ theme }) => theme.spacing.xxs};
    padding-bottom: ${({ theme }) => theme.spacing.xxs};
    padding-left: ${({ theme, level }) =>
      css`calc(${level} * ${theme.spacing.xs})`};
  }

  .Node-icon-wrapper {
    display: flex;
    width: ${({ theme }) => theme.spacing.xs};
  }

  .Node-menu-wrapper {
    flex: 0;
    display: flex;
    width: ${({ theme }) => theme.spacing.xs};
    align-self: stretch;
    padding: ${({ theme }) => theme.spacing.xxs}
      ${({ theme }) => theme.spacing.xxs};

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.quaternary};
      }
    }
  }

  .Node-heading {
    flex: 1;
    align-self: center;
  }

  .Node-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
  }
`

const Chevron = styled(Icon)<{ toggled: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`

interface INode {
  node: ITreeNode
  onToggle: (tree: ITreeNode, toggled: boolean) => void
  level?: number
}

export function Node({ node, onToggle, level = 1 }: INode) {
  const client = useApolloClient()
  const [deleteFile] = useDeleteFile()
  const containerRef = useRef(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle()
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { type, toggled, name, children, path } = node
  const { currentPath } = useReadCurrentPath()
  const isActive = currentPath === node.path

  function handleSetIsNewFileOpen() {
    setIsNewFileOpen(true)
    setOpen(false)
  }

  function handleToggleMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation()

    setOpen(isOpen => !isOpen)
  }

  function onClick(node: ITreeNode) {
    if (node.type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    if (node.type === Node_Type.Folder) {
      if (isActive) {
        onToggle(node, !node.toggled)
      } else {
        onToggle(node, true)
      }
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
      <Item level={level} isActive={isActive} ref={containerRef}>
        <div className="Node-button" onClick={() => onClick(node)}>
          {type === Node_Type.Folder && (
            <div className="Node-icon-wrapper">
              <Chevron
                toggled={toggled}
                size="xs"
                icon="chevron-right"
                prefix="fa"
                marginRight
              />
            </div>
          )}
          {type === Node_Type.Folder ? (
            <div className="Node-icon-wrapper">
              <Icon size="xs" icon="folder" prefix="fa" marginRight />
            </div>
          ) : (
            <div className="Node-icon-wrapper">
              <Icon size="xs" icon="file" prefix="fa" marginRight />
            </div>
          )}
          <h5 className="Node-heading">{name}</h5>
        </div>
        <div className="Node-menu-wrapper" onClick={handleToggleMenu}>
          <Icon icon="ellipsis-h" isDisabled={isOpen} ariaLabel="dropdown" />
        </div>
        {isOpen && (
          <Portal domNode={containerRef.current} className="Node-dropdown">
            <Dropdown ref={ref} items={dropdownItems} />
          </Portal>
        )}
      </Item>
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
