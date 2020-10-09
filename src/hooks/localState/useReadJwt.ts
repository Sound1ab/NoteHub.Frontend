import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ReadJwtQuery, ReadJwtQueryVariables } from '../../components/apollo'

export const ReadJwtDocument = gql`
  query ReadJwt {
    jwt @client
  }
`

export function useReadJwt() {
  const client = useApolloClient()
  const { data } = useQuery<ReadJwtQuery, ReadJwtQueryVariables>(
    ReadJwtDocument
  )

  return {
    jwt: data?.jwt,
    client,
  }
}
