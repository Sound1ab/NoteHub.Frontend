import { useApolloClient } from '@apollo/react-hooks'
import React, { ReactNode, useRef, useState } from 'react'
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
import { Fade } from '../../animation'
import { Node_Type } from '../../apollo/generated_components_typings'
import { FileInput } from '../../molecules'
import { Dropdown, Icon } from '..'

interface INodeItem {
  node: ITreeNode
  onToggle: (path: string, toggled: boolean) => void
  level: number
  openFileInput: () => void
  children?: ReactNode
}

export function NodeItem({
  level,
  node,
  onToggle,
  openFileInput,
  children,
}: INodeItem) {
  const containerRef = useRef(null)
  const client = useApolloClient()
  const [deleteFile] = useDeleteFile()
  const { isOpen, Portal, ref, setOpen } = useModalToggle()
  const { currentPath } = useReadCurrentPath()
  const isActive = currentPath === node.path
  const { toggled, name, type } = node
  const [isRenaming, setIsRenaming] = useState(false)

  function handleSetIsNewFileOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    openFileInput()
    setOpen(false)
    onToggle(node.path, true)
  }

  function handleSetIsRenamingOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setOpen(false)
    setIsRenaming(true)
  }

  function handleToggleMenu(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation()
    setOpen(isOpen => !isOpen)
  }

  async function handleDeleteFile() {
    try {
      await deleteFile(node.path)
    } catch {
      alert('Could not delete file. Please try again.')
    }
  }

  function onChevronClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: ITreeNode
  ) {
    e.stopPropagation()
    onToggle(node.path, !node.toggled)
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

  const dropdownItems = [
    node.type === Node_Type.File
      ? {
          icon: 'trash' as const,
          prefix: 'fa' as const,
          label: 'Delete file',
          onClick: handleDeleteFile,
        }
      : {
          icon: 'edit' as const,
          prefix: 'fa' as const,
          label: 'Create file',
          onClick: handleSetIsNewFileOpen,
        },
    {
      icon: 'pen' as const,
      prefix: 'fa' as const,
      label: 'Rename',
      onClick: handleSetIsRenamingOpen,
    },
  ]

  return (
    <StyledListItem>
      <Wrapper
        level={level}
        onClick={() => onClick(node)}
        ref={containerRef}
        type={type}
        aria-label={node.type === Node_Type.File ? 'file' : 'folder'}
      >
        {isRenaming ? (
          <FileInput
            path={currentPath}
            onClickOutside={() => setIsRenaming(false)}
            onToggle={onToggle}
            action="rename"
          />
        ) : (
          <>
            <Details>
              {type === Node_Type.Folder && (
                <Chevron
                  toggled={toggled}
                  size="sm"
                  icon="chevron-right"
                  prefix="fa"
                  ariaLabel="chevron"
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                    onChevronClick(e, node)
                  }
                />
              )}
              {type === Node_Type.Folder ? (
                <StyledIcon size="sm" icon="folder" prefix="fa" />
              ) : (
                <StyledIcon size="sm" icon="file" prefix="fa" />
              )}
              <Heading className="Node-heading">{name}</Heading>
            </Details>
            <Actions onClick={handleToggleMenu}>
              <StyledIcon
                icon="ellipsis-h"
                isDisabled={isOpen}
                ariaLabel={`${name} actions`}
              />
            </Actions>
          </>
        )}
      </Wrapper>
      <Fade show={isOpen}>
        <Portal
          domNode={containerRef.current}
          placementAroundContainer="bottom"
        >
          <Dropdown ref={ref} items={dropdownItems} />
        </Portal>
      </Fade>
      {children}
    </StyledListItem>
  )
}

const StyledListItem = styled.li`
  margin: 0;
`

const Wrapper = styled.div<Pick<INodeItem, 'level'> & { type: string }>`
  position: relative;
  display: flex;
  padding-left: ${({ theme, level, type }) => {
    if (level === 0 && type === Node_Type.File) {
      return theme.spacing.s
    } else if (level === 0 && type === Node_Type.Folder) {
      return 0
    }
    const additionalPadding = type === Node_Type.File ? theme.spacing.s : '0px'
    return css`calc(calc(${level} * ${theme.spacing.s}) + ${additionalPadding})`
  }};
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background.tertiary};
    }
  }
`

const Details = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;

  * + * {
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`

const Heading = styled.h4`
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Actions = styled.button`
  flex: 0;
  position: relative;
  display: flex;
  width: ${({ theme }) => theme.spacing.xs};
  align-self: stretch;
  padding: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background.quaternary};
    }
  }
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Chevron = styled(StyledIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`
