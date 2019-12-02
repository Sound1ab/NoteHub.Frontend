import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import {
  ReadGithubUserAccessTokenQuery,
  ReadGithubUserAccessTokenQueryVariables,
} from '../../components/apollo/generated_components_typings'

export const ReadGithubUserAccessTokenDocument = gql`
  query ReadGithubUserAccessToken($code: String!, $state: String!) {
    readGithubUserAccessToken(code: $code, state: $state)
  }
`

export function useReadGithubUserAccessToken(
  code: string | null,
  state: string | null
) {
  const { data } = useQuery<
    ReadGithubUserAccessTokenQuery,
    ReadGithubUserAccessTokenQueryVariables
  >(ReadGithubUserAccessTokenDocument, {
    variables: {
      code: code ?? '',
      state: state ?? '',
    },
  })

  return data && data.readGithubUserAccessToken
}
