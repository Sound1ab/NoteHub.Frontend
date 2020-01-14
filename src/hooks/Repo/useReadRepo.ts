import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadRepoQuery,
  ReadRepoQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'
import { useReadCurrentRepoName, useReadGithubUser } from '..'

export const ReadRepoDocument = gql`
  ${RepoFragment}
  query ReadRepo($username: String!, $repo: String!) {
    readRepo(username: $username, repo: $repo) {
      ...repo
    }
  }
`

export function useReadRepo() {
  const user = useReadGithubUser()
  const { currentRepoName } = useReadCurrentRepoName()

  const { data, loading } = useQuery<ReadRepoQuery, ReadRepoQueryVariables>(
    ReadRepoDocument,
    {
      skip: !currentRepoName || !user?.login,
      variables: {
        repo: currentRepoName ?? '',
        username: user?.login ?? '',
      },
    }
  )

  return { repo: data?.readRepo, loading }
}
