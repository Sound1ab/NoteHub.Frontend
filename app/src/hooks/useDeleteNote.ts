import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  DeleteNoteMutation,
  DeleteNoteMutationVariables,
  ListNotesDocument,
  ListNotesQuery,
  ListNotesQueryVariables,
} from '../components/apollo/generated_components_typings'
import { NoteFragment } from '../fragments'

export const DeleteNoteDocument = gql`
  ${NoteFragment}
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      ...note
    }
  }
`

export function useDeleteNote(activeNotebook: string | null) {
  return useMutation<DeleteNoteMutation, DeleteNoteMutationVariables>(
    DeleteNoteDocument,
    {
      update: (cache, { data }) => {
        const deletedNote = data && data.deleteNote
        if (!deletedNote) return

        const result = cache.readQuery<ListNotesQuery, ListNotesQueryVariables>(
          {
            query: ListNotesDocument,
            variables: {
              filter: {
                notebookId: { eq: activeNotebook },
              },
            },
          }
        )

        const notes =
          (result && result.listNotes && result.listNotes.items) || []

        cache.writeQuery<ListNotesQuery, ListNotesQueryVariables>({
          data: {
            listNotes: {
              items: notes.filter(note => note && note.id !== deletedNote.id),
            },
          },
          query: ListNotesDocument,
          variables: {
            filter: {
              notebookId: { eq: activeNotebook },
            },
          },
        })
      },
    }
  )
}
