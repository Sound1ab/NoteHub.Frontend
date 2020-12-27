import { gql, useQuery } from '@apollo/client'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { isFile } from '../../utils/isFile'
import { useReadCurrentPath } from '../localState/useReadCurrentPath'

export const ReadFileDocument = gql`
  ${FileFragment}
  query ReadFile($path: String!) {
    readFile(path: $path) {
      ...file
    }
  }
`

export function useReadFile() {
  const currentPath = useReadCurrentPath()

  const { data, loading, error } = useQuery<
    ReadFileQuery,
    ReadFileQueryVariables
  >(ReadFileDocument, {
    skip: !currentPath || !isFile(currentPath),
    variables: {
      path: currentPath,
    },
  })

  return { file: data?.readFile, loading, error }
}
