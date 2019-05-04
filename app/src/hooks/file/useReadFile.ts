import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const ReadFile = gql`
  ${FileFragment}
  query ReadFile($username: String!, $repo: String!, $filename: String!) {
    readFile(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
`

export function useReadFile(username: string, repo: string, filename: string) {
  const { data, loading } = useQuery<ReadFileQuery, ReadFileQueryVariables>(
    ReadFile,
    {
      // fetchPolicy: 'no-cache',
      variables: {
        filename,
        repo,
        username,
      },
    }
  )

  return { file: data && data.readFile, loading }
}
