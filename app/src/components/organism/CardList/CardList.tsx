import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { COLOR } from '../../../enums'
import { NotebookFragment, NoteFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import { setActiveNote } from '../../../store'
import { styled } from '../../../theme'
import {
  ReadNotebookQuery,
  ReadNotebookQueryVariables,
} from '../../apollo/generated_components_typings'
import { Container, Heading, Icon } from '../../atoms'
import { Card } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xxxl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  .sticky {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .header {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.s};
    background-color: transparent;
  }

  .header-options {
    cursor: pointer;
  }
`

export const ReadNotebookDocument = gql`
  ${NotebookFragment}
  ${NoteFragment}
  query ReadNotebook($id: ID!) {
    readNotebook(id: $id) {
      ...notebook
      notes {
        ...note
      }
    }
  }
`

export function CardList() {
  const [state, dispatch] = useStore()

  const { data } = useQuery<ReadNotebookQuery, ReadNotebookQueryVariables>(
    ReadNotebookDocument,
    {
      variables: {
        id: state.activeNotebook || '',
      },
    }
  )

  const notebook = data && data.readNotebook

  function handleCardClick(note: string | null) {
    if (dispatch) dispatch(setActiveNote(note))
  }

  return (
    <Style>
      <Container className="sticky">
        <div className="header">
          <Heading type="h2" marginBottom>
            {(notebook && notebook.title) || ''}
          </Heading>
          <div className="header-options">
            <Icon
              color={COLOR.MEDIUM}
              icon="sync"
              prefix="fa"
              marginRight
              size="sm"
            />
            <Icon
              color={COLOR.MEDIUM}
              icon="trash"
              prefix="fa"
              marginRight
              size="sm"
            />
          </div>
        </div>
        {notebook &&
          notebook.notes &&
          notebook.notes.map(note => {
            if (!note) return
            return (
              <span onClick={handleCardClick.bind(null, note.id)}>
                <Card
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  excerpt={note.excerpt}
                  createdAt={note.createdAt}
                  isSelected={
                    !!state.activeNote && state.activeNote === note.id
                  }
                />
              </span>
            )
          })}
      </Container>
    </Style>
  )
}
