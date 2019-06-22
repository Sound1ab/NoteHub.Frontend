import React from 'react'
import { BulletList } from 'react-content-loader'
import { FileList } from '..'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useListRepos } from '../../../hooks/Repo/useListRepos'
import { activeNotebook, resetNotebook } from '../../../store'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'

const Style = styled.nav`
  position: relative;
  height: 100%;
  overflow-y: auto;

  .Navigation-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
  }

  .Navigation-button {
    background-color: transparent;
  }
`

export function Navigation() {
  const [state, dispatch] = useStore()
  const { repos, loading } = useListRepos(state.user.username)

  function handleHeadingClick(notebook: string | null) {
    if (!dispatch) {
      return
    }
    if (state.notebook.activeNotebook === notebook) {
      dispatch(resetNotebook())
    } else {
      dispatch(activeNotebook(notebook))
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
              state.notebook.activeNotebook &&
              repo &&
              repo.name === state.notebook.activeNotebook

            return (
              <>
                <div className="Navigation-wrapper">
                  <Icon
                    size="xs"
                    color={isActive ? COLOR.ACTIVE : COLOR.DARK}
                    icon={isActive ? 'chevron-down' : 'chevron-right'}
                    prefix="fa"
                    marginRight
                  />
                  <button
                    className="Navigation-button"
                    key={(repo && repo.id) || 'repo'}
                  >
                    <Heading
                      color={isActive ? COLOR.ACTIVE : COLOR.DARK}
                      onClick={handleHeadingClick.bind(null, repo && repo.name)}
                      type="h5"
                    >
                      {repo && repo.name}
                    </Heading>
                  </button>
                </div>
                {isActive && <FileList />}
              </>
            )
          })
      )}
    </Style>
  )
}
