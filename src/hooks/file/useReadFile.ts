import { gql, useQuery } from '@apollo/client'

import { ReadFileQuery, ReadFileQueryVariables } from '../../components/apollo'
import { FileFragment } from '../../fragments'
import { isFile } from '../../utils'
import { useReadCurrentPath } from '..'

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
    skip: !isFile(currentPath),
    variables: {
      path: currentPath,
    },
  })

  return { file: data?.readFile, loading, error }
}
