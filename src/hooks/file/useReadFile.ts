import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { ROOT_PATH } from '../../utils'
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
        // Root path gets added in createNodes so we can toggle the top level folder
        // This needs to be removed as Github doesn't know about it
        path: currentPath ? currentPath.replace(`${ROOT_PATH}/`, '') : '',
      },
    }
  )

  return { file: data?.readFile, loading }
}
