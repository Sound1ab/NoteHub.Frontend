import { gql, useQuery } from '@apollo/client'

import {
  ReadRepoQuery,
  ReadRepoQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { RepoFragment } from '../../fragments'

export const ReadRepoDocument = gql`
  ${RepoFragment}
  query ReadRepo {
    readRepo {
      ...repo
    }
  }
`

export function useReadRepo() {
  const { data, loading } = useQuery<ReadRepoQuery, ReadRepoQueryVariables>(
    ReadRepoDocument
  )

  return { repo: data?.readRepo, loading }
}
