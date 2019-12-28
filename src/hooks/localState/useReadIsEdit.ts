import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadIsEditQuery,
  ReadIsEditQueryVariables,
} from '../../components/apollo/generated_components_typings'

const ReadIsEditDocument = gql`
  query ReadIsEdit {
    isEdit @client
  }
`

export function useReadIsEdit() {
  const client = useApolloClient()
  const { data } = useQuery<ReadIsEditQuery, ReadIsEditQueryVariables>(
    ReadIsEditDocument
  )

  return {
    isEdit: data?.isEdit ?? true,
    client,
  }
}
