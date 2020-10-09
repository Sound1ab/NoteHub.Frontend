import { useApolloClient, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadCurrentRepoNameQuery,
  ReadCurrentRepoNameQueryVariables,
} from '../../components/apollo'

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
