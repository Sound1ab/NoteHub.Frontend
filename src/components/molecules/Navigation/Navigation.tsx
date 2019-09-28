import React from 'react'
import { BulletList } from 'react-content-loader'
import { FileList } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useListRepos } from '../../../hooks/Repo/useListRepos'
import { activeRepo, resetRepo } from '../../../store'
import { styled } from '../../../theme'
import { Repo } from '../../apollo/generated_components_typings'
import { Heading, Icon } from '../../atoms'

const Style = styled.nav`
  position: relative;
  height: 100%;
  overflow-y: auto;

  .Navigation-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .Navigation-button {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
              <div key={repo.id}>
                <div className="Navigation-wrapper">
                  <button
                    className="Navigation-button"
                    key={(repo && repo.id) || 'repo'}
                    onClick={handleHeadingClick.bind(null, repo)}
                  >
                    <Icon
                      size="xs"
                      color={isActive ? COLOR.ACTIVE : COLOR.DARK}
                      icon={isActive ? 'chevron-down' : 'chevron-right'}
                      prefix="fa"
                      marginRight
                    />
                    <Heading
                      color={isActive ? COLOR.ACTIVE : COLOR.INHERIT}
                      type="h5"
                    >
                      {repo && repo.name}
                    </Heading>
                    {repo.private && <Icon
                      size="xs"
                      color={COLOR.DARK}
                      icon="product-hunt"
                      prefix="fab"
                      marginLeft
                    />}
                  </button>
                </div>
                {isActive && <FileList />}
              </div>
            )
          })
      )}
    </Style>
  )
}
