import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { Profile } from '..'
import { COLOR } from '../../../enums'
import { NotebookFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import { setActiveNotebook } from '../../../store'
import { styled } from '../../../theme'
import {
  ListNotebooksQuery,
  ListNotebooksQueryVariables,
} from '../../apollo/generated_components_typings'
import { Container, Heading, Icon } from '../../atoms'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xxl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};

  .new-notebook-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.s};
  }

  .title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .heading {
    color: ${({ theme }) => theme.colors.text.secondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.text.tertiary};
    }
  }

  .active-heading {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  .sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.s};
  }

  .nav > a {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
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

export function Sidebar() {
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
      <Container className="sticky">
        <Profile />
        <div className="new-notebook-wrapper">
          <Icon
            size="lg"
            color={COLOR.ACCENT}
            icon="plus-circle"
            prefix="fa"
            marginRight
          />
          <Heading color={COLOR.LIGHT} className="category-heading" type="h3">
            New Notebook
          </Heading>
        </div>
        <div className="title-wrapper">
          <Icon icon="book" prefix="fa" marginRight />
          <Heading
            color={COLOR.LIGHT}
            className="category-heading"
            type="h5"
            textTransform="uppercase"
          >
            Notebooks
          </Heading>
        </div>
        <nav className="nav">
          {notebooks &&
            notebooks.map(notebook => (
              <Heading
                color={COLOR.LIGHT}
                onClick={handleHeadingClick.bind(null, notebook && notebook.id)}
                className={
                  state.activeNotebook &&
                  notebook &&
                  notebook.id === state.activeNotebook
                    ? 'heading active-heading'
                    : 'heading'
                }
                type="h4"
                marginBottom
              >
                {notebook && notebook.title}
              </Heading>
            ))}
        </nav>
      </Container>
    </Style>
  )
}
