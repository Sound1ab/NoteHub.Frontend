import React from 'react'
import { BulletList } from 'react-content-loader'

import {
  useListRepos,
  useReadCurrentRepoName,
  useReadIsNewRepoOpen,
} from '../../../hooks'
import { styled } from '../../../theme'
import { NavigationItem } from '../../atoms'
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

  if (!repos) {
    return null
  }

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
        <BulletList />
      ) : (
        repos
          .sort((repoA, repoB) => {
            return repoA.name.localeCompare(repoB.name)
          })
          .map(repo => {
            const isActive = repo.name === currentRepoName

            return (
              <NavigationItem
                isDisabled={repo.id < 0}
                isActive={isActive}
                key={repo.id.toString()}
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
