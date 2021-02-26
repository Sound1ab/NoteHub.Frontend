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
  () => Promise<void>,
  LazyQueryResult<RefreshQuery, Exact<{ [key: string]: never }>>
] {
  const [query, rest] = useLazyQuery<RefreshQuery, RefreshQueryVariables>(
    RefreshDocument
  )

  // console.log('here', rest)

  async function refresh() {
    return query()
  }

  return [refresh, rest]
}
