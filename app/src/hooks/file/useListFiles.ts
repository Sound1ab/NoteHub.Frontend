import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ListFilesQuery,
  ListFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const ListFilesDocument = gql`
  ${FileFragment}
  query ListFiles($username: String!, $repo: String!) {
    listFiles(username: $username, repo: $repo) {
      items {
        ...file
      }
    }
  }
`

export function useListFiles(username: string, repo: string) {
  const { data, loading } = useQuery<ListFilesQuery, ListFilesQueryVariables>(
    ListFilesDocument,
    {
      variables: {
        repo,
        username,
      },
    }
  )

  return {
    files: (data && data.listFiles && data.listFiles.items) || [],
    loading,
  }
}
