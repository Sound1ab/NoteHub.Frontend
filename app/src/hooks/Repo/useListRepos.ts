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
  const { data } = useQuery<ListReposQuery, ListReposQueryVariables>(
    ListReposDocument,
    {
      variables: {
        username: username || '',
      },
    }
  )

  return (data && data.listRepos && data.listRepos.items) || []
}
