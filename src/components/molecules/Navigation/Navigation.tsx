import React from 'react'

import { useListRepos, useReadCurrentRepoName } from '../../../hooks'
import { styled } from '../../../theme'
import { NavigationItem, NavigationItemSkeleton } from '../../atoms'

const Style = styled.nav`
  position: relative;
  height: 100%;
`

export function Navigation() {
  const { currentRepoName, client } = useReadCurrentRepoName()
  const { repos, loading } = useListRepos()

  function handleHeadingClick(repoName: string) {
    client.writeData({ data: { currentFileName: null } })
    client.writeData({ data: { currentRepoName: repoName } })
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
              onClick={handleHeadingClick.bind(null, repo.name)}
              heading={repo && repo.name}
              isPrivate={repo.private}
            />
          )
        })}
    </Style>
  )
}
