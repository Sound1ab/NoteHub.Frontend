import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadSearchQuery,
  ReadSearchQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const ReadSearchDocument = gql`
  query ReadSearch {
    search @client
  }
`

export function useReadSearch() {
  const client = useApolloClient()
  const { data } = useQuery<ReadSearchQuery, ReadSearchQueryVariables>(
    ReadSearchDocument
  )

  return {
    search: data?.search ?? '',
    client,
  }
}
