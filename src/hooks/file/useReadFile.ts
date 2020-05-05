import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { useReadCurrentPath } from '../'

export const ReadFileDocument = gql`
  ${FileFragment}
  query ReadFile($path: String!) {
    readFile(path: $path) {
      ...file
    }
  }
`

export function useReadFile() {
  const { currentPath } = useReadCurrentPath()

  const { data, loading } = useQuery<ReadFileQuery, ReadFileQueryVariables>(
    ReadFileDocument,
    {
      skip: !currentPath || !currentPath.endsWith('.md'),
      variables: {
        path: currentPath ?? '',
      },
    }
  )

  return { file: data?.readFile, loading }
}
