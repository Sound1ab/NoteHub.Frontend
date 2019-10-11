import React from 'react'
import { BulletList } from 'react-content-loader'
import { useStore } from '../../../hooks'
import { useListRepos } from '../../../hooks/Repo/useListRepos'
import { activeRepo, resetRepo } from '../../../store'
import { styled } from '../../../theme'
import { Repo } from '../../apollo/generated_components_typings'
import { NavigationItem } from '../../atoms'

const Style = styled.nav`
  position: relative;
  height: 100%;
  overflow-y: auto;
`

export function Navigation() {
  const [state, dispatch] = useStore()
  const { repos, loading } = useListRepos(state.user.username)

  function handleHeadingClick(repo: Repo) {
    if (!dispatch) {
      return
    }
    if (state.repo.activeRepo.name === repo.name) {
      dispatch(resetRepo())
    } else {
      dispatch(resetRepo())
      dispatch(activeRepo(repo))
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
            const isActive =
              state.repo.activeRepo &&
              repo &&
              repo.name === state.repo.activeRepo.name

            return (
              <NavigationItem
                isActive={isActive}
                key={repo.id.toString()}
                onClick={handleHeadingClick.bind(null, repo)}
                heading={repo && repo.name}
                isPrivate={repo.private}
              />
            )
          })
      )}
    </Style>
  )
}
