import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'

export const ListReposDocument = gql`
  ${RepoFragment}
  query ListRepos($username: String!) {
    listRepos(username: $username) {
      items {
        ...repo
      }
    }
  }
`

export function useListRepos(username: string) {
  console.log('here2', username)
  const { data, loading } = useQuery<ListReposQuery, ListReposQueryVariables>(
    ListReposDocument,
    {
      skip: !username,
      variables: {
        username: username || '',
      },
    }
  )

  return {
    loading,
    repos: (data && data.listRepos && data.listRepos.items) || [],
  }
}
