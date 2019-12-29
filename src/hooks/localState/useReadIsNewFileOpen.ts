import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadIsNewFileOpenQuery,
  ReadIsNewFileOpenQueryVariables,
} from '../../components/apollo/generated_components_typings'

const ReadIsNewFileOpenDocument = gql`
  query ReadIsNewFileOpen {
    isNewFileOpen @client
  }
`

export function useReadIsNewFileOpen() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadIsNewFileOpenQuery,
    ReadIsNewFileOpenQueryVariables
  >(ReadIsNewFileOpenDocument)

  return {
    isNewFileOpen: data?.isNewFileOpen ?? false,
    client,
  }
}
