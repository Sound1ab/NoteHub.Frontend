import React from 'react'
import { useListNotebooks } from '../../../hooks'
import { useStore } from '../../../hooks/useStore'
import { setActiveNotebook } from '../../../store'
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

  /* visited link */
  > a:visited {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  /* mouse over link */
  > a:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  /* selected link */
  > a:active {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function Navigation() {
  const [state, dispatch] = useStore()
  const notebooks = useListNotebooks()

  function handleHeadingClick(notebook: string | null) {
    if (dispatch) {
      dispatch(setActiveNotebook(notebook))
    }
  }

  return (
    <Style>
      {notebooks.map(notebook => (
        <a href="javascript:">
          <Heading
            onClick={handleHeadingClick.bind(null, notebook && notebook.id)}
            className={
              state.activeNotebook &&
              notebook &&
              notebook.id === state.activeNotebook
                ? 'Navigation-active-heading'
                : ''
            }
            type="h5"
            marginBottom
          >
            {notebook && notebook.title}
          </Heading>
        </a>
      ))}
    </Style>
  )
}
