import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadIsNewRepoOpenQuery,
  ReadIsNewRepoOpenQueryVariables,
} from '../../components/apollo/generated_components_typings'

const ReadIsNewRepoOpenDocument = gql`
  query ReadIsNewRepoOpen {
    isNewRepoOpen @client
  }
`

export function useReadIsNewRepoOpen() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadIsNewRepoOpenQuery,
    ReadIsNewRepoOpenQueryVariables
  >(ReadIsNewRepoOpenDocument)

  return {
    isNewRepoOpen: data?.isNewRepoOpen ?? false,
    client,
  }
}
