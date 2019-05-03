import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const ReadFile = gql`
  ${FileFragment}
  query ReadFile($username: String!, $repo: String!, $file: String!) {
    readFile(username: $username, repo: $repo, file: $file) {
      ...file
    }
  }
`

export function useReadFile(username: string, repo: string, file: string) {
  const { data } = useQuery<ReadFileQuery, ReadFileQueryVariables>(ReadFile, {
    fetchPolicy: 'no-cache',
    variables: {
      file,
      repo,
      username,
    },
  })

  return data && data.readFile
}
