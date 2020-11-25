import React, { ReactNode, Ref, SyntheticEvent, useRef } from 'react'
import styled, { css } from 'styled-components'

import { useModalToggle } from '../../../../../../../hooks'
import { ITreeNode } from '../../../../../../../types'
import { Fade } from '../../../../../../animation'
import { Node_Type } from '../../../../../../apollo'
import { Button, Dropdown, IDropdownItem, Icon } from '../../../../../../atoms'

interface INode {
  node: ITreeNode
  level: number
  children?: ReactNode
  childNodes?: ReactNode
  dropdownItems: IDropdownItem[]
  onClick: () => void
  isActive: boolean
  dndRef?: Ref<HTMLLIElement>
  className?: string
}

export function Node({
  level,
  node,
  children,
  childNodes,
  dropdownItems,
  onClick,
  isActive,
  dndRef,
  className,
}: INode) {
  const containerRef = useRef(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>()
  const { type, name } = node

  function handleToggleMenu(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation()
    setOpen((isOpen) => !isOpen)
  }

  function handleOnClick(e: SyntheticEvent) {
    // Enter event from form submission when renaming file propogates down
    // to this click event. We don't want to call this if the event came from
    // the rename form.
    if ((e.target as HTMLInputElement).form) {
      return
    }

    // Don't allow any clicks on the item while request is still in flight
    if (node.isOptimistic) {
      return
    }

    onClick()
  }

  return (
    <StyledListItem ref={dndRef}>
      <Wrapper
        isDisabled={node.isOptimistic}
        isActive={isActive}
        level={level}
        onClick={handleOnClick}
        ref={containerRef}
        type={type}
        aria-label={node.type === Node_Type.File ? 'file' : 'folder'}
        className={className}
      >
        <Details>
          {children}
          <Heading isDisabled={node.isOptimistic}>{name}</Heading>
        </Details>
        <Actions onClick={handleToggleMenu}>
          <StyledIcon
            size="xs"
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
            containerRef={ref}
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
  Pick<INode, 'level'> & {
    type: string
    isActive: boolean
    isDisabled: boolean
  }
>`
  position: relative;
  display: flex;
  padding-left: ${({ theme, level, type }) => {
    if (level === -1) {
      return 0
    } else if (level === 0 && type === Node_Type.File) {
      return theme.spacing.ms
    } else if (level === 0 && type === Node_Type.Folder) {
      return 0
    }
    const additionalPadding = type === Node_Type.File ? theme.spacing.ms : '0px'
    return css`calc(calc(${level} * ${theme.spacing.s}) + ${additionalPadding})`
  }};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.secondary : 'transparent'};
  box-shadow: inset ${({ theme }) => theme.spacing.xxxs} 0px 0px 0px
    ${({ theme, isActive }) => (isActive ? theme.colors.accent : 'transparent')};

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
  align-items: center;

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
  user-select: none;
`

const Actions = styled(Button)`
  flex: 0;
  position: relative;
  display: flex;
  align-self: stretch;
  padding: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text.primary};
  opacity: 0;

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.background.quaternary};
    }
  }

  @media (hover: hover) and (pointer: fine) {
    ${Wrapper}:hover:not(:disabled) & {
      opacity: 1;
    }
  }
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`
