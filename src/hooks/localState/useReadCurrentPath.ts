import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadCurrentPathQuery,
  ReadCurrentPathQueryVariables,
} from '../../components/apollo/generated_components_typings'

const ReadCurrentPathDocument = gql`
  query ReadCurrentPath {
    currentPath @client
  }
`

export function useReadCurrentPath() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadCurrentPathQuery,
    ReadCurrentPathQueryVariables
  >(ReadCurrentPathDocument)

  return { currentPath: data?.currentPath, client }
}
