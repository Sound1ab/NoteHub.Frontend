import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  CreateNoteMutation,
  CreateNoteMutationVariables,
  ListNotesDocument,
  ListNotesQuery,
  ListNotesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { NoteFragment } from '../../fragments'

export const CreateNoteDocument = gql`
  ${NoteFragment}
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      ...note
    }
  }
`

export function useCreateNote(activeNotebook: string | null) {
  return useMutation<CreateNoteMutation, CreateNoteMutationVariables>(
    CreateNoteDocument,
    {
      update: (cache, { data }) => {
        const newNote = data && data.createNote
        if (!newNote) return
        if (!activeNotebook) {
          alert('No active notebook to save note to')
        }

        const result = cache.readQuery<ListNotesQuery, ListNotesQueryVariables>(
          {
            query: ListNotesDocument,
            variables: {
              filter: { notebookId: { eq: activeNotebook } },
            },
          }
        )

        const notes =
          (result && result.listNotes && result.listNotes.items) || []

        cache.writeQuery<ListNotesQuery, ListNotesQueryVariables>({
          data: {
            listNotes: {
              items: notes.concat([{ ...newNote }]),
            },
          },
          query: ListNotesDocument,
          variables: {
            filter: { notebookId: { eq: activeNotebook } },
          },
        })
      },
    }
  )
}
