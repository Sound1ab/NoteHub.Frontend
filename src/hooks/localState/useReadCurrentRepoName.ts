import { useApolloClient, useQuery } from '@apollo/react-hooks'
import {
  ReadCurrentRepoNameQuery,
  ReadCurrentRepoNameQueryVariables,
} from '../../components/apollo/generated_components_typings'
import gql from 'graphql-tag'

const ReadCurrentRepoNameDocument = gql`
  query ReadCurrentRepoName {
    currentRepoName @client
  }
`

export function useReadCurrentRepoName() {
  const client = useApolloClient()
  const { data } = useQuery<
    ReadCurrentRepoNameQuery,
    ReadCurrentRepoNameQueryVariables
  >(ReadCurrentRepoNameDocument)

  return { currentRepoName: data?.currentRepoName, client }
}
