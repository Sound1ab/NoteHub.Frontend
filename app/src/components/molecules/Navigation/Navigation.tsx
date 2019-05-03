import React from 'react'
import { useStore } from '../../../hooks'
import { useListRepos } from '../../../hooks/Repo/useListRepos'
import { activeNotebook } from '../../../store'
import { styled } from '../../../theme'
import { Heading } from '../../atoms'

const Style = styled.nav`
  position: relative;

  .Navigation-active-heading {
    color: ${({ theme }) => theme.colors.accent};
  }

  > a {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  > a {
    text-decoration: none;
  }

  > a:link {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  > a:visited {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  > a:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  > a:active {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function Navigation() {
  const [state, dispatch] = useStore()
  const repos = useListRepos(state.user.username)

  function handleHeadingClick(notebook: string | null) {
    if (dispatch) {
      dispatch(activeNotebook(notebook))
    }
  }

  return (
    <Style>
      {repos.map(repo => (
        <a key={(repo && repo.id) || 'repo'} href="javascript:">
          <Heading
            onClick={handleHeadingClick.bind(null, repo && repo.name)}
            className={
              state.notebook.activeNotebook &&
              repo &&
              repo.name === state.notebook.activeNotebook
                ? 'Navigation-active-heading'
                : ''
            }
            type="h5"
            marginBottom
          >
            {repo && repo.name}
          </Heading>
        </a>
      ))}
    </Style>
  )
}
