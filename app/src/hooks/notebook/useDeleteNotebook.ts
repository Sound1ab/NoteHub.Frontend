import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  DeleteNotebookMutation,
  DeleteNotebookMutationVariables,
  ListNotebooksDocument,
  ListNotebooksQuery,
  ListNotebooksQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { NotebookFragment } from '../../fragments'

export const DeleteNotebookDocument = gql`
  ${NotebookFragment}
  mutation DeleteNotebook($input: DeleteNotebookInput!) {
    deleteNotebook(input: $input) {
      ...notebook
    }
  }
`

export function useDeleteNotebook() {
  return useMutation<DeleteNotebookMutation, DeleteNotebookMutationVariables>(
    DeleteNotebookDocument,
    {
      update: (cache, { data }) => {
        const deletedNotebook = data && data.deleteNotebook
        if (!deletedNotebook) return

        const result = cache.readQuery<
          ListNotebooksQuery,
          ListNotebooksQueryVariables
        >({
          query: ListNotebooksDocument,
          variables: {
            filter: {
              userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' },
            },
          },
        })

        const notebooks =
          (result && result.listNotebooks && result.listNotebooks.items) || []

        cache.writeQuery<ListNotebooksQuery, ListNotebooksQueryVariables>({
          data: {
            listNotebooks: {
              items: notebooks.filter(
                notebook => notebook && notebook.id !== deletedNotebook.id
              ),
            },
          },
          query: ListNotebooksDocument,
          variables: {
            filter: {
              userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' },
            },
          },
        })
      },
    }
  )
}
