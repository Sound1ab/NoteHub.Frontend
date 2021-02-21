import { gql, useQuery } from '@apollo/client'

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
  const { data, loading } = useQuery<
    ReadGithubUserQuery,
    ReadGithubUserQueryVariables
  >(ReadGithubUserDocument)

  return { user: data?.readGithubUser, loading }
}
