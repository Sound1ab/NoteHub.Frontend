import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  ReadRepoQuery,
  ReadRepoQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'

export const ReadRepoDocument = gql`
  ${RepoFragment}
  query ReadRepo($username: String!, $repo: String!) {
    readRepo(username: $username, repo: $repo) {
      ...repo
    }
  }
`

export function useReadRepo(username: string, repo: string) {
  const { data } = useQuery<ReadRepoQuery, ReadRepoQueryVariables>(
    ReadRepoDocument,
    {
      variables: {
        repo,
        username,
      },
    }
  )

  return data && data.readRepo
}
