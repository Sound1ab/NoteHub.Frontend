import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ListFilesQuery,
  ListFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { useReadCurrentRepoName, useReadGithubUser } from '../'

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

export function useListFiles() {
  const user = useReadGithubUser()
  const { currentRepoName } = useReadCurrentRepoName()

  const { data, loading } = useQuery<ListFilesQuery, ListFilesQueryVariables>(
    ListFilesDocument,
    {
      skip: !currentRepoName || !user?.login,
      variables: {
        repo: currentRepoName ?? '',
        username: user?.login ?? '',
      },
    }
  )

  return {
    files: data?.listFiles?.items ?? [],
    loading,
  }
}
