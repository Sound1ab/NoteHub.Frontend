import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ListNotebooksQuery,
  ListNotebooksQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { NotebookFragment } from '../../fragments'

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

export function useListNotebooks() {
  const { data } = useQuery<ListNotebooksQuery, ListNotebooksQueryVariables>(
    ListNotebooksDocument,
    {
      variables: {
        filter: { userId: { eq: '985d9b4d-920d-4b4f-9358-ab91146944d8' } },
      },
    }
  )

  return (data && data.listNotebooks && data.listNotebooks.items) || []
}
