import { gql, useQuery } from '@apollo/client'

import {
  ReadFilesQuery,
  ReadFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { TreeFileFragment } from '../../fragments'

export const ReadFilesDocument = gql`
  ${TreeFileFragment}
  query ReadFiles {
    readFiles {
      ...treeFile
    }
  }
`

export function useReadFiles() {
  const { data, loading, error } = useQuery<
    ReadFilesQuery,
    ReadFilesQueryVariables
  >(ReadFilesDocument)

  return { files: data?.readFiles, loading, error }
}
