import React, { ReactNode, Ref, SyntheticEvent, useRef } from 'react'
import styled, { css } from 'styled-components'

import { useActivePath } from '../../../../../../../hooks/recoil/useActivePath'
import { useModalToggle } from '../../../../../../../hooks/utils/useModalToggle'
import { ITreeNode } from '../../../../../../../types'
import { Node_Type } from '../../../../../../apollo/generated_components_typings'
import { Button } from '../../../../../../atoms/Button/Button'
import {
  Dropdown,
  IDropdownItem,
} from '../../../../../../atoms/Dropdown/Dropdown'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { Fade } from '../../../../../../animation/Mount/Fade'

interface INode {
  node: ITreeNode
  level: number
  children?: ReactNode
  childNodes?: ReactNode
  dropdownItems: IDropdownItem[]
  onClick: () => void
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
  dndRef,
  className,
}: INode) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { isOpen, Portal, ref, setOpen } = useModalToggle<HTMLUListElement>(
    containerRef
  )
  const { type, name, path } = node
  const [activePath] = useActivePath()
  const isActive = path === activePath

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
    <StyledListItem ref={dndRef} className={className}>
      <Wrapper
        isOpen={isOpen}
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
        <Actions
          onClick={handleToggleMenu}
          isDisabled={node.isOptimistic}
          isOpen={isOpen}
          aria-label={`${name} actions`}
        >
          <StyledIcon size="xs" icon="ellipsis-h" isDisabled={isOpen} />
        </Actions>
      </Wrapper>
      <Fade show={isOpen}>
        <Portal>
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
    isOpen: boolean
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
    const additionalPadding = type === Node_Type.File ? '24px' : '0px'
    return css`calc(calc(${level} * ${theme.spacing.s}) + ${additionalPadding})`
  }};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  box-shadow: inset ${({ theme }) => theme.spacing.xxxs} 0px 0px 0px
    ${({ isActive }) => (isActive ? css`var(--accent-primary)` : 'transparent')};
  width: 100%;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--background-quaternary);
    `};

  ${({ isOpen }) =>
    isOpen &&
    css`
      background-color: var(--background-quinary);
    `};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--background-quinary);
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

const Heading = styled.span<{
  isDisabled: boolean
}>`
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--text-secondary);
    `};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`

const Actions = styled(Button)<{ isDisabled: boolean; isOpen: boolean }>`
  flex: 0;
  position: relative;
  display: flex;
  align-self: stretch;
  padding: ${({ theme }) => theme.spacing.xs};
  color: var(--text-primary);
  opacity: 0;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      background-color: var(--background-quaternary);
    `};

  @media (hover: hover) and (pointer: fine) {
    &:hover:not(:disabled) {
      background-color: var(--background-quaternary);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    ${Wrapper}:hover:not(:disabled) & {
      opacity: 1;
    }
  }
`

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
`
