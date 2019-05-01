import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { NotebookFragment, NoteFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import { setActiveNote } from '../../../store'
import { styled } from '../../../theme'
import {
  ReadNotebookQuery,
  ReadNotebookQueryVariables,
} from '../../apollo/generated_components_typings'
import { Container } from '../../atoms'
import { Card, CardHeader } from '../../molecules'

const Style = styled.div`
  position: relative;
  flex: 0 0 ${({ theme }) => theme.spacing.xxxl};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
      <CardHeader title={notebook && notebook.title} />
      <Container className="wrapper">
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
                  createdAt={note.createdAt && note.createdAt.dateLongForm}
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
