import { useApolloClient } from '@apollo/react-hooks'
import React, { useRef } from 'react'

import { COLOR } from '../../../enums'
import {
  useDeleteRepo,
  useModalToggle,
  useReadCurrentFileName,
  useReadCurrentRepoName,
  useReadGithubUser,
} from '../../../hooks'
import { styled } from '../../../theme'
import { Dropdown, Heading, Icon } from '..'

const Style = styled.div<
  Pick<INavigationItem, 'isActive' | 'isDisabled'> & { isOpen: boolean }
>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'all')};

  .NavigationItem-button {
    background-color: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .NavigationItem-icon {
    color: ${({ theme }) => theme.colors.accent};
  }

  .NavigationItem-heading {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme, isActive, isDisabled }) =>
      isDisabled
        ? theme.colors.text.tertiary
        : isActive
        ? theme.colors.accent
        : theme.colors.text.primary};
    &:hover {
      opacity: 0.5;
    }
  }

  .NavigationItem-dropdown {
    position: absolute;
    bottom: 0;
    right: -${({ theme }) => theme.spacing.xs};
    z-index: 100;
    transform: translateY(100%);
  }

  .NavigationItem-icon-chevron {
    color: ${({ theme }) => theme.colors.text.primary};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    cursor: pointer;
    margin-left: ${({ theme }) => theme.spacing.xs};
    flex: 0 0 auto;
  }

  &:hover .NavigationItem-icon-chevron {
    opacity: 1;
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
            full_name: `${user?.login}/Soft.${heading}`,
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
        disabled={isOpen}
      >
        {isPrivate && (
          <Icon
            className="NavigationItem-icon"
            size="xs"
            icon="product-hunt"
            prefix="fab"
            marginRight
            title={`${heading} is a private repo`}
          />
        )}
        <Heading
          className="NavigationItem-heading"
          type="h4"
          aria-label={isActive ? `${heading} is selected` : ''}
          data-testid="navigation-item-heading"
        >
          {heading}
        </Heading>
      </button>
      <Icon
        className="NavigationItem-icon-chevron"
        icon="chevron-down"
        onClick={handleToggleMenu}
        isDisabled={isOpen}
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
            ]}
          />
        </Portal>
      )}
    </Style>
  )
}
