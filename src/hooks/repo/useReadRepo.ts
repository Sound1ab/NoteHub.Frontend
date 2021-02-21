import { gql, useQuery } from '@apollo/client'

import {
  ReadRepoQuery,
  ReadRepoQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'

export const ReadRepoDocument = gql`
  ${RepoFragment}
  query ReadRepo($name: String!) {
    readRepo(name: $name) {
      ...repo
    }
  }
`

export function useReadRepo(name: string) {
  const { data, loading } = useQuery<ReadRepoQuery, ReadRepoQueryVariables>(
    ReadRepoDocument,
    {
      variables: { name },
    }
  )

  return { repo: data?.readRepo, loading }
}
