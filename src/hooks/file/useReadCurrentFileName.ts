import { useApolloClient, useQuery } from '@apollo/react-hooks'
import {
  ReadCurrentFileNameQuery,
  ReadCurrentFileNameQueryVariables,
} from '../../components/apollo/generated_components_typings'
import gql from 'graphql-tag'

const ReadCurrentFileNameDocument = gql`
  query ReadCurrentFileName {
    currentFileName @client
  }
`

export function useReadCurrentFileName() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadCurrentFileNameQuery,
    ReadCurrentFileNameQueryVariables
  >(ReadCurrentFileNameDocument)

  return { currentFileName: data?.currentFileName, client }
}
