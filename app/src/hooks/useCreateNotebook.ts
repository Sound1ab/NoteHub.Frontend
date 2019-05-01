import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  CreateNotebookMutation,
  CreateNotebookMutationVariables,
  CreateNoteMutation,
  CreateNoteMutationVariables,
  ListNotebooksDocument,
  ListNotebooksQuery,
  ListNotesDocument,
  ListNotesQuery,
  ListNotesQueryVariables,
} from '../components/apollo/generated_components_typings'
import { NotebookFragment, NoteFragment } from '../fragments'

export const CreateNotebookDocument = gql`
  ${NotebookFragment}
  mutation CreateNotebook($input: CreateNotebookInput!) {
    createNotebook(input: $input) {
      ...notebook
    }
  }
`

export function useCreateNotebook() {
  return useMutation<CreateNotebookMutation, CreateNotebookMutationVariables>(
    CreateNotebookDocument,
    {
      update: (cache, { data }) => {
        const newNotebook = data && data.createNotebook
        if (!newNotebook) return

        const result = cache.readQuery<ListNotebooksQuery>({
          query: ListNotebooksDocument,
          variables: {
            filter: { userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' } },
          },
        })

        const notebooks =
          (result && result.listNotebooks && result.listNotebooks.items) || []

        cache.writeQuery<ListNotebooksQuery>({
          data: {
            listNotebooks: {
              items: notebooks.concat([{ ...newNotebook }]),
            },
          },
          query: ListNotebooksDocument,
          variables: {
            filter: { userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' } },
          },
        })
      },
    }
  )
}
