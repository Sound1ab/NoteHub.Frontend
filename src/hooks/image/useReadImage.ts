import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  ReadImageQuery,
  ReadImageQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const ReadImageDocument = gql`
  ${FileFragment}
  query ReadImage($username: String!, $repo: String!, $filename: String!) {
    readImage(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
`

export function useReadImage(username: string, repo: string, filename: string) {
  const { data, loading } = useQuery<ReadImageQuery, ReadImageQueryVariables>(
    ReadImageDocument,
    {
      skip: !username || !repo || !filename,
      variables: {
        filename,
        repo,
        username,
      },
    }
  )

  return { file: data?.readImage, loading }
}
