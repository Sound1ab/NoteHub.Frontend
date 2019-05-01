import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { NotebookFragment, NoteFragment } from '../../../fragments'
import { useStore } from '../../../hooks/useStore'
import { setActiveNote } from '../../../store'
import { styled } from '../../../theme'
import {
  ListNotesQuery,
  ListNotesQueryVariables,
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

export const ListNotesDocument = gql`
  ${NoteFragment}
  query ListNotes($filter: ModelNoteFilterInput, $limit: Int, $offset: Int) {
    listNotes(filter: $filter, limit: $limit, offset: $offset) {
      items {
        ...note
      }
    }
  }
`

export const ReadNotebookDocument = gql`
  ${NotebookFragment}
  query ReadNotebook($id: ID!) {
    readNotebook(id: $id) {
      ...notebook
    }
  }
`

export function CardList() {
  const [state, dispatch] = useStore()

  const { data: notesData } = useQuery<ListNotesQuery, ListNotesQueryVariables>(
    ListNotesDocument,
    {
      variables: {
        filter: { notebookId: { eq: state.activeNotebook || '' } },
      },
    }
  )

  const { data: notebookData } = useQuery<
    ReadNotebookQuery,
    ReadNotebookQueryVariables
  >(ReadNotebookDocument, {
    variables: {
      id: state.activeNotebook || '',
    },
  })

  const notebook = notebookData && notebookData.readNotebook
  const notes =
    (notesData && notesData.listNotes && notesData.listNotes.items) || []

  console.log(notebook)

  function handleCardClick(note: string | null) {
    if (dispatch) dispatch(setActiveNote(note))
  }

  return (
    <Style>
      <CardHeader title={notebook && notebook.title} />
      <Container className="wrapper">
        {notes &&
          notes.map(note => {
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
