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
  const { data, loading } = useQuery<ListReposQuery, ListReposQueryVariables>(
    ListReposDocument,
    {
      variables: {
        username: username || '',
      },
    }
  )

  return {
    repos: (data && data.listRepos && data.listRepos.items) || [],
    loading,
  }
}
