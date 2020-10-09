import { gql, useQuery, useReactiveVar } from '@apollo/client'

import { ReadFileQuery, ReadFileQueryVariables } from '../../components/apollo'
import { currentPathVar } from '../../components/providers/ApolloProvider/cache'
import { FileFragment } from '../../fragments'
import { isFile } from '../../utils'

export const ReadFileDocument = gql`
  ${FileFragment}
  query ReadFile($path: String!) {
    readFile(path: $path) {
      ...file
    }
  }
`

export function useReadFile() {
  const currentPath = useReactiveVar(currentPathVar)

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
