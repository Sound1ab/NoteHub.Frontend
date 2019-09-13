import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import {
  ReadGithubUserQuery,
  ReadGithubUserQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { GithubUserFragment } from '../../fragments'

export const ReadGithubUserDocument = gql`
  ${GithubUserFragment}
  query ReadGithubUser {
    readGithubUser {
      ...githubUser
    }
  }
`

export function useReadGithubUser() {
  const { data } = useQuery<ReadGithubUserQuery, ReadGithubUserQueryVariables>(
    ReadGithubUserDocument
  )

  return data && data.readGithubUser
}
