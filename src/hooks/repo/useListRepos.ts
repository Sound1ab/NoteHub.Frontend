import { gql, useQuery } from '@apollo/client'

import {
  ListReposQuery,
  ListReposQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const ListReposDocument = gql`
  query ListRepos {
    listRepos {
      id
      full_name
    }
  }
`

export function useListRepos() {
  const { data, loading } = useQuery<ListReposQuery, ListReposQueryVariables>(
    ListReposDocument
  )

  return { repos: data?.listRepos, loading }
}
