import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import {
  REPO_NAMESPACE,
  useDeleteRepo,
  useListRepos,
  useReadCurrentRepoName,
  useReadGithubUser,
  useUpdateRepo,
} from '../../../hooks'
import { styled } from '../../../theme'
import { scrollIntoView } from '../../../utils'
import { Repo } from '../../apollo/generated_components_typings'
import { List, ListItem, ListItemSkeleton } from '..'

const Style = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: auto;
`

export function Repos() {
  const { currentRepoName } = useReadCurrentRepoName()
  const { repos, loading } = useListRepos()
  const client = useApolloClient()
  const [deleteRepo] = useDeleteRepo()
  const [updateRepo] = useUpdateRepo()

  const user = useReadGithubUser()

  function handleHeadingClick(repoName: string) {
    client.writeData({ data: { currentFileName: null } })
    client.writeData({ data: { currentRepoName: repoName } })
    scrollIntoView(CONTAINER_ID.CARDLIST)
  }

  if (loading) {
    return <ListItemSkeleton />
  }

  if (!repos) {
    return null
  }

  async function handleDeleteRepo(repo: Repo) {
    const { private: isPrivate, node_id, id, name, description } = repo

    if (!user || !name) {
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
            repo: name,
            username: user.login,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteRepo: {
            __typename: 'Repo',
            full_name: `${user?.login}/${REPO_NAMESPACE}.${name}`,
            id,
            name,
            node_id,
            description,
            private: isPrivate,
          },
        },
      })
    } catch {
      alert('There was an issue deleting your file, please try again')
    }
  }

  async function handleUpdatePrivateRepo(repo: Repo) {
    const { private: isPrivate, node_id, id, name, description } = repo

    if (!user || !name) {
      alert('Error')
      return
    }

    try {
      await updateRepo({
        variables: {
          input: {
            repo: name,
            username: user.login,
            private: !isPrivate,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateRepo: {
            __typename: 'Repo',
            full_name: `${user?.login}/${REPO_NAMESPACE}.${name}`,
            id,
            name,
            node_id,
            description,
            private: !isPrivate,
          },
        },
      })
    } catch {
      alert('There was an issue update your repo, please try again')
    }
  }

  return (
    <Style>
      <List items={repos}>
        {repo => {
          const isActive = repo.name === currentRepoName

          return (
            <ListItem
              isDisabled={repo.id < 0}
              isActive={isActive}
              key={repo.full_name}
              onClick={() => handleHeadingClick(repo.name)}
              heading={repo.name}
              dropdownItems={[
                {
                  icon: 'trash',
                  prefix: 'fa',
                  label: 'Delete repo',
                  onClick: () => handleDeleteRepo(repo),
                },
                {
                  icon: 'product-hunt',
                  prefix: 'fab',
                  label: repo.private ? 'Make public' : 'Make private',
                  onClick: () => handleUpdatePrivateRepo(repo),
                },
              ]}
            />
          )
        }}
      </List>
    </Style>
  )
}
