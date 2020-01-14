import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useListRepos, useReadCurrentRepoName } from '../../../hooks'
import { styled } from '../../../theme'
import { scrollIntoView } from '../../../utils'
import { NavigationItem, NavigationItemSkeleton } from '../../atoms'

const Style = styled.ul`
  position: relative;
  height: 100%;
`

export function Navigation() {
  const { currentRepoName, client } = useReadCurrentRepoName()
  const { repos, loading } = useListRepos()

  function handleHeadingClick(repoName: string) {
    client.writeData({ data: { currentFileName: null } })
    client.writeData({ data: { currentRepoName: repoName } })
    scrollIntoView(CONTAINER_ID.CARDLIST)
  }

  if (loading) {
    return <NavigationItemSkeleton />
  }

  return (
    <Style>
      {repos
        ?.sort((repoA, repoB) => {
          return repoA.name.localeCompare(repoB.name)
        })
        .map(repo => {
          const isActive = repo.name === currentRepoName

          return (
            <NavigationItem
              isDisabled={repo.id < 0}
              isActive={isActive}
              key={repo.full_name}
              id={repo.id}
              nodeId={repo.node_id}
              onClick={() => handleHeadingClick(repo.name)}
              heading={repo.name}
              isPrivate={repo.private}
            />
          )
        })}
    </Style>
  )
}
