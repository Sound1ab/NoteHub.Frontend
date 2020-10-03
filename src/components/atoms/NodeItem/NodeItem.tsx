import { useApolloClient } from '@apollo/react-hooks'
import React, { ReactNode, SyntheticEvent, useRef } from 'react'
import { css } from 'styled-components'

import { useModalToggle, useReadCurrentPath } from '../../../hooks'
import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { Fade } from '../../animation'
import { Node_Type } from '../../apollo/generated_components_typings'
import { Dropdown, IDropdownItem, Icon } from '..'

interface INodeItem {
  node: ITreeNode
  level: number
  children?: ReactNode
  childNodes?: ReactNode
  dropdownItems: IDropdownItem[]
  onClick: () => void
}

export function NodeItem({
  level,
  node,
  children,
  childNodes,
  dropdownItems,
  onClick,
}: INodeItem) {
  const containerRef = useRef(null)
  const client = useApolloClient()

  const { isOpen, Portal, ref, setOpen } = useModalToggle()
  const { currentPath } = useReadCurrentPath()
  const isActive = currentPath === node.path
  const { type, name } = node

  function handleToggleMenu(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation()
    setOpen((isOpen) => !isOpen)
  }

  function handleOnClick(e: SyntheticEvent) {
    // Enter event from form submission when renaming file propogates down
    // to this click event. We don't want to call this if the event came from
    // the rename form.
    if ((e.target as any).form) {
      return
    }

    // Don't allow any clicks on the item while request is still in flight
    if (node.isOptimistic) {
      return
    }

    onClick()

    client.writeData({
      data: { currentPath: node.path },
    })
  }

  return (
    <StyledListItem>
      <Wrapper
        isDisabled={node.isOptimistic}
        isActive={isActive}
        level={level}
        onClick={handleOnClick}
        ref={containerRef}
        type={type}
        aria-label={node.type === Node_Type.File ? 'file' : 'folder'}
      >
        <Details>
          {children}
          <Heading isDisabled={node.isOptimistic}>{name}</Heading>
        </Details>
        <Actions onClick={handleToggleMenu}>
          <StyledIcon
            icon="ellipsis-h"
            isDisabled={isOpen}
            aria-label={`${name} actions`}
          />
        </Actions>
      </Wrapper>
      <Fade show={isOpen}>
        <Portal
          domNode={containerRef.current}
          placementAroundContainer="bottom-left"
        >
          <Dropdown
            ref={ref}
            items={dropdownItems}
            onClose={() => setOpen(false)}
          />
        </Portal>
      </Fade>
      {childNodes}
    </StyledListItem>
  )
}

const StyledListItem = styled.li`
  margin: 0;
`

const Wrapper = styled.div<
  Pick<INodeItem, 'level'> & {
    type: string
    isActive: boolean
    isDisabled: boolean
  }
>`
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
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.secondary : 'transparent'};

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

const Heading = styled.h4<{
  isDisabled: boolean
}>`
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.text.secondary : theme.colors.text.primary};
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
