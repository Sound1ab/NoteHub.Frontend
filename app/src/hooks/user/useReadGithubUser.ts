import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadGithubUserQuery,
  ReadGithubUserQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { GithubUserFragment } from '../../fragments'

export const ReadGithubUserDocument = gql`
  ${GithubUserFragment}
  query ReadGithubUser($username: String!) {
    readGithubUser(username: $username) {
      ...githubUser
    }
  }
`

export function useReadGithubUser(username: string) {
  const { data } = useQuery<ReadGithubUserQuery, ReadGithubUserQueryVariables>(
    ReadGithubUserDocument,
    {
      variables: {
        username: username || '',
      },
    }
  )

  return data && data.readGithubUser
}
