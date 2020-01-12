import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadIsAuthorisedQuery,
  ReadIsAuthorisedQueryVariables,
} from '../../components/apollo/generated_components_typings'

const ReadIsAuthorisedDocument = gql`
  query ReadIsAuthorised {
    isAuthorised @client
  }
`

export function useReadIsAuthorised() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadIsAuthorisedQuery,
    ReadIsAuthorisedQueryVariables
  >(ReadIsAuthorisedDocument)

  return {
    isAuthorised: data?.isAuthorised ?? false,
    client,
  }
}
