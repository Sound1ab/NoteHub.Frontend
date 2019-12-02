import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  ListImagesQuery,
  ListImagesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const ListImagesDocument = gql`
  ${FileFragment}
  query ListImages($username: String!, $repo: String!) {
    listImages(username: $username, repo: $repo) {
      items {
        ...file
      }
    }
  }
`

export function useListImages(username: string, repo: string) {
  const { data, loading } = useQuery<ListImagesQuery, ListImagesQueryVariables>(
    ListImagesDocument,
    {
      skip: !username || !repo,
      variables: {
        repo,
        username,
      },
    }
  )

  return {
    files: data?.listImages.items ?? [],
    loading,
  }
}
