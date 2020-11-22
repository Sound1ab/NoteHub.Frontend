import { useQuery, gql } from '@apollo/client'

import { ReadRepoQuery, ReadRepoQueryVariables } from '../../components/apollo'
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
