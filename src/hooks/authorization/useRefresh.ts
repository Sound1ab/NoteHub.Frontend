import { LazyQueryResult, gql, useLazyQuery } from '@apollo/client'

import {
  Exact,
  RefreshQuery,
  RefreshQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const RefreshDocument = gql`
  query Refresh {
    refresh
  }
`

export function useLazyRefresh(): [
  () => Promise<LazyQueryResult<RefreshQuery, Exact<{ [key: string]: never }>>>,
  LazyQueryResult<RefreshQuery, Exact<{ [key: string]: never }>>
] {
  const [query, rest] = useLazyQuery<RefreshQuery, RefreshQueryVariables>(
    RefreshDocument
  )

  async function refresh() {
    return query()
  }

  return [refresh, rest]
}
