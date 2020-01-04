import React from 'react'

import {
  useListRepos,
  useReadCurrentRepoName,
  useReadIsNewRepoOpen,
} from '../../../hooks'
import { styled } from '../../../theme'
import { NavigationItem } from '../../atoms'
import { NavigationItemSkeleton } from '../../atoms/NavigationItem/NavigationItemSkeleton'
import { RepoInput } from '../RepoInput/RepoInput'

const Style = styled.nav`
  position: relative;
  height: 100%;
  overflow-y: auto;
`

export function Navigation() {
  const { currentRepoName, client } = useReadCurrentRepoName()
  const { repos, loading } = useListRepos()
  const { isNewRepoOpen } = useReadIsNewRepoOpen()

  function handleHeadingClick(repoName: string) {
    if (currentRepoName === repoName) {
      client.writeData({ data: { currentRepoName: null } })
    } else {
      client.writeData({ data: { currentRepoName: repoName } })
    }
  }

  return (
    <Style>
      {loading ? (
        <NavigationItemSkeleton />
      ) : (
        repos
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
          })
      )}
      {isNewRepoOpen && <RepoInput />}
    </Style>
  )
}
