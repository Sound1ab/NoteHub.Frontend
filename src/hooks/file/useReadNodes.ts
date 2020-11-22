import { gql, useQuery } from '@apollo/client'

import {
  ReadFilesQuery,
  ReadFilesQueryVariables,
} from '../../components/apollo'
import { TreeFileFragment } from '../../fragments'

export const ReadNodesDocument = gql`
  ${TreeFileFragment}
  query ReadFiles {
    readFiles {
      ...treeFile
    }
  }
`

export function useReadNodes() {
  const { data, loading, error } = useQuery<
    ReadFilesQuery,
    ReadFilesQueryVariables
  >(ReadNodesDocument)

  return { gitNodes: data?.readFiles, loading, error }
}
