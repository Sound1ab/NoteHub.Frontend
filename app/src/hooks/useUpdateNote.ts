import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  ListNotesDocument,
  ListNotesQuery,
  UpdateNoteMutation,
  UpdateNoteMutationVariables,
} from '../components/apollo/generated_components_typings'
import { NoteFragment } from '../fragments'

export const UpdateNoteDocument = gql`
  ${NoteFragment}
  mutation UpdateNote($input: UpdateNoteInput!) {
    updateNote(input: $input) {
      ...note
    }
  }
`

export function useUpdateNote(
  activeNotebook: string | null,
  activeNote: string | null
) {
  return useMutation<UpdateNoteMutation, UpdateNoteMutationVariables>(
    UpdateNoteDocument,
    {
      update: (cache, { data }) => {
        const updatedNote = data && data.updateNote
        if (!updatedNote) return

        const result = cache.readQuery<ListNotesQuery>({
          query: ListNotesDocument,
          variables: {
            filter: { notebookId: { eq: activeNotebook } },
          },
        })

        const notes =
          (result && result.listNotes && result.listNotes.items) || []

        cache.writeQuery<ListNotesQuery>({
          data: {
            listNotes: {
              items: notes
                .filter(
                  savedNotes => savedNotes && savedNotes.id !== activeNote
                )
                .concat([{ ...updatedNote }]),
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
