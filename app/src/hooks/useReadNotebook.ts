import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadNotebookQuery,
  ReadNotebookQueryVariables,
} from '../components/apollo/generated_components_typings'
import { NotebookFragment } from '../fragments'

export const ReadNotebookDocument = gql`
  ${NotebookFragment}
  query ReadNotebook($id: ID!) {
    readNotebook(id: $id) {
      ...notebook
    }
  }
`

export function useReadNotebook(activeNotebook: string | null) {
  const { data } = useQuery<ReadNotebookQuery, ReadNotebookQueryVariables>(
    ReadNotebookDocument,
    {
      variables: {
        id: activeNotebook || '',
      },
    }
  )

  return data && data.readNotebook
}
