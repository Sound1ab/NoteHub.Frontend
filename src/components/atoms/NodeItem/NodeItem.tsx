import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef } from 'react'
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
import { Dropdown, Icon } from '..'

const Style = styled.li<{ isActive: boolean; level: number }>`
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
    padding-top: ${({ theme }) => theme.spacing.xs};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    padding-left: ${({ theme, level }) =>
      css`calc(${level} * ${theme.spacing.xs})`};
  }

  .Node-menu-wrapper {
    flex: 0;
    display: flex;
    width: ${({ theme }) => theme.spacing.xs};
    align-self: stretch;
    padding: ${({ theme }) => theme.spacing.xs};

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.background.quaternary};
      }
    }
  }

  .Node-heading {
    flex: 1;
    align-self: center;
    padding-left: ${({ theme }) => theme.spacing.xxs};
  }

  .Node-dropdown {
    position: absolute;
    top: 100%;
    right: ${({ theme }) => theme.spacing.xxs};
    z-index: 100;
  }
`

const Chevron = styled(Icon)<{ toggled: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`

interface INodeItem {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  level: number
  openFileInput: () => void
}

export function NodeItem({ level, node, onToggle, openFileInput }: INodeItem) {
  const containerRef = useRef(null)
  const client = useApolloClient()
  const [deleteFile] = useDeleteFile()
  const { isOpen, Portal, ref, setOpen } = useModalToggle()
  const { currentPath } = useReadCurrentPath()
  const isActive = currentPath === node.path
  const { toggled, name, type } = node

  function handleSetIsNewFileOpen() {
    openFileInput()
    setOpen(false)
    onToggle(node.path, true)
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
        onToggle(node.path, !node.toggled)
      } else {
        onToggle(node.path, true)
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
    <Style level={level} isActive={isActive} ref={containerRef}>
      <div
        aria-label={node.type === Node_Type.File ? 'file' : 'folder'}
        className="Node-button"
        onClick={() => onClick(node)}
      >
        {type === Node_Type.Folder && (
          <Chevron
            toggled={toggled}
            size="sm"
            icon="chevron-right"
            prefix="fa"
            marginRight
          />
        )}
        {type === Node_Type.Folder ? (
          <Icon size="sm" icon="folder" prefix="fa" />
        ) : (
          <Icon size="sm" icon="file" prefix="fa" marginLeft />
        )}
        <h5 className="Node-heading">{name}</h5>
      </div>
      <div className="Node-menu-wrapper" onClick={handleToggleMenu}>
        <Icon icon="ellipsis-h" isDisabled={isOpen} ariaLabel="item menu" />
      </div>
      {isOpen && (
        <Portal domNode={containerRef.current} className="Node-dropdown">
          <Dropdown ref={ref} items={dropdownItems} />
        </Portal>
      )}
    </Style>
  )
}
