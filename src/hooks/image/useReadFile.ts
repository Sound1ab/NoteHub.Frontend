import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadImageQuery,
  ReadImageQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const ReadImage = gql`
  ${FileFragment}
  query ReadImage($username: String!, $repo: String!, $filename: String!) {
    readImage(username: $username, repo: $repo, filename: $filename) {
      ...file
    }
  }
`

export function useReadImage(username: string, repo: string, filename: string) {
  const { data, loading } = useQuery<ReadImageQuery, ReadImageQueryVariables>(
    ReadImage,
    {
      // fetchPolicy: 'no-cache',
      skip: !username || !repo || !filename,
      variables: {
        filename,
        repo,
        username,
      },
    }
  )

  return { file: data && data.readImage, loading }
}
