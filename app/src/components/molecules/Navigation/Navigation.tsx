import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { NotebookFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import { setActiveNotebook } from '../../../store'
import { styled } from '../../../theme'
import {
  ListNotebooksQuery,
  ListNotebooksQueryVariables,
} from '../../apollo/generated_components_typings'
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

export const ListNotebooksDocument = gql`
  ${NotebookFragment}
  query ListNotebooks(
    $filter: ModelNotebookFilterInput
    $limit: Int
    $offset: Int
  ) {
    listNotebooks(filter: $filter, limit: $limit, offset: $offset) {
      items {
        ...notebook
      }
    }
  }
`

export function Navigation() {
  const [state, dispatch] = useStore()
  const { data } = useQuery<ListNotebooksQuery, ListNotebooksQueryVariables>(
    ListNotebooksDocument,
    {
      variables: {
        filter: { userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' } },
      },
    }
  )

  const notebooks =
    (data && data.listNotebooks && data.listNotebooks.items) || []

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
