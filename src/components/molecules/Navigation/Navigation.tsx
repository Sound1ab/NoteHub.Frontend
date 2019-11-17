import React, { useContext } from 'react'
import { BulletList } from 'react-content-loader'
import { useListRepos } from '../../../hooks/Repo/useListRepos'
import { styled } from '../../../theme'
import { NavigationItem } from '../../atoms'
import { RepoInput } from '../RepoInput/RepoInput'
import { NewRepoContext } from '../../organisms'
import { useReadCurrentRepoName } from '../../../hooks/Repo/useReadCurrentRepoName'

const Style = styled.nav`
  position: relative;
  height: 100%;
  overflow-y: auto;
`

export function Navigation() {
  const { currentRepoName, client } = useReadCurrentRepoName()
  const context = useContext(NewRepoContext)
  const { repos, loading } = useListRepos()

  function handleHeadingClick(repoName: String) {
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
                isActive={isActive}
                key={repo.id.toString()}
                onClick={handleHeadingClick.bind(null, repo.name)}
                heading={repo && repo.name}
                isPrivate={repo.private}
              />
            )
          })
      )}
      {context && context.isNewRepoOpen && <RepoInput />}
    </Style>
  )
}
