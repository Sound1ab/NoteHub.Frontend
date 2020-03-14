import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef } from 'react'

import { COLOR } from '../../../enums'
import {
  REPO_NAMESPACE,
  useDeleteRepo,
  useModalToggle,
  useReadGithubUser,
  useUpdateRepo,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Dropdown, Icon } from '..'

const Style = styled.div<
  Pick<INavigationItem, 'isActive' | 'isDisabled'> & { isOpen: boolean }
>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.accent : 'transparent'};

  @media (hover: hover) and (pointer: fine) {
    background-color: ${({ theme, isActive }) =>
      isActive ? theme.colors.accent : theme.colors.background.quaternary};
  }

  .NavigationItem-button {
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    overflow: hidden;
    padding: ${({ theme }) => theme.spacing.xxs} 0
      ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.xs};
  }

  .NavigationItem-icon {
    color: ${({ theme }) => theme.colors.accent};
  }

  .NavigationItem-heading {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme, isDisabled }) =>
      isDisabled ? theme.colors.text.tertiary : theme.colors.text.primary};
  }

  .NavigationItem-dropdown {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 100;
    transform: translateY(100%);
  }

  .NavigationItem-icon-chevron {
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    margin: 0 ${({ theme }) => theme.spacing.xs};
    flex: 0 0 auto;
  }
`

interface INavigationItem {
  isActive: boolean
  isDisabled: boolean
  onClick: () => void
  heading: string
  id: number
  nodeId: string
  isPrivate: boolean
}

export function NavigationItem({
  isActive,
  isDisabled,
  heading,
  isPrivate,
  id,
  nodeId,
  onClick,
}: INavigationItem) {
  const containerRef = useRef(null)
  const client = useApolloClient()
  const [deleteRepo] = useDeleteRepo()
  const [updateRepo] = useUpdateRepo()

  const user = useReadGithubUser()
  const { isOpen, Portal, ref, setOpen } = useModalToggle()

  function handleToggleMenu() {
    setOpen(isOpen => !isOpen)
  }

  async function handleDeleteRepo() {
    if (!user || !heading) {
      alert('Error')
      return
    }

    setOpen(false)

    try {
      client.writeData({
        data: { currentRepoName: null },
      })
      await deleteRepo({
        variables: {
          input: {
            repo: heading,
            username: user.login,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteRepo: {
            __typename: 'Repo',
            full_name: `${user?.login}/${REPO_NAMESPACE}.${heading}`,
            id,
            name: heading,
            node_id: nodeId,
            description: null,
            private: isPrivate,
          },
        },
      })
    } catch {
      alert('There was an issue deleting your file, please try again')
    }
  }

  async function handleUpdatePrivateRepo() {
    if (!user || !heading) {
      alert('Error')
      return
    }

    setOpen(false)

    try {
      await updateRepo({
        variables: {
          input: {
            repo: heading,
            username: user.login,
            private: !isPrivate,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateRepo: {
            __typename: 'Repo',
            full_name: `${user?.login}/${REPO_NAMESPACE}.${heading}`,
            id,
            name: heading,
            node_id: nodeId,
            description: null,
            private: !isPrivate,
          },
        },
      })
    } catch {
      alert('There was an issue update your repo, please try again')
    }
  }

  return (
    <Style
      isActive={isActive}
      isDisabled={isDisabled}
      ref={containerRef}
      isOpen={isOpen}
    >
      <button
        className="NavigationItem-button"
        onClick={onClick}
        disabled={isDisabled || isOpen}
      >
        <span
          className="NavigationItem-heading"
          aria-label={isActive ? `${heading} is selected` : ''}
          data-testid="navigation-item-heading"
        >
          {heading}
        </span>
      </button>
      <Icon
        className="NavigationItem-icon-chevron"
        icon="ellipsis-h"
        onClick={handleToggleMenu}
        isDisabled={isOpen}
        ariaLabel="Repo dropdown"
        color={COLOR.LIGHT}
      />
      {isOpen && (
        <Portal
          domNode={containerRef.current}
          className="NavigationItem-dropdown"
        >
          <Dropdown
            ref={ref}
            items={[
              {
                icon: 'trash',
                prefix: 'fa',
                label: 'Delete repo',
                onClick: handleDeleteRepo,
              },
              {
                icon: 'product-hunt',
                prefix: 'fab',
                label: isPrivate ? 'Make public' : 'Make private',
                onClick: handleUpdatePrivateRepo,
              },
            ]}
          />
        </Portal>
      )}
    </Style>
  )
}
