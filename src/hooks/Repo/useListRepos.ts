import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'

export const ListReposDocument = gql`
  ${RepoFragment}
  query ListRepos {
    listRepos {
      items {
        ...repo
      }
    }
  }
`

export function useListRepos() {
  const { data, loading } = useQuery<ListReposQuery, ListReposQueryVariables>(
    ListReposDocument
  )

  return {
    loading,
    repos: data?.listRepos?.items,
  }
}
