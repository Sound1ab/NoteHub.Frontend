import gql from 'graphql-tag'
import { useApolloClient, useQuery } from 'react-apollo-hooks'
import {
  ReadIsEditQuery,
  ReadIsEditQueryVariables,
} from '../../components/apollo/generated_components_typings'

const ReadIsEditDocument = gql`
  query ReadIsEdit {
    isEdit @client
  }
`

export function useIsEdit() {
  const client = useApolloClient()
  const { data } = useQuery<ReadIsEditQuery, ReadIsEditQueryVariables>(
    ReadIsEditDocument
  )

  return { isEdit: data?.isEdit, client }
}
