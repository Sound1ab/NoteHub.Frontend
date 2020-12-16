import { gql, useQuery } from '@apollo/client'

import { ReadFileQuery, ReadFileQueryVariables } from '../../components/apollo'
import { FileWithMessagesFragment } from '../../fragments'
import { isFile } from '../../utils'
import { useReadActiveRetextSettings, useReadCurrentPath } from '..'

export const ReadFileDocument = gql`
  ${FileWithMessagesFragment}
  query ReadFile($path: String!, $retextSettings: [RETEXT_SETTINGS!]) {
    readFile(path: $path, retextSettings: $retextSettings) {
      ...fileWithMessages
    }
  }
`

export function useReadFile() {
  const currentPath = useReadCurrentPath()
  const { activeRetextSettings } = useReadActiveRetextSettings()

  const { data, loading, error } = useQuery<
    ReadFileQuery,
    ReadFileQueryVariables
  >(ReadFileDocument, {
    skip: !currentPath || !isFile(currentPath),
    variables: {
      path: currentPath,
      retextSettings: activeRetextSettings,
    },
    fetchPolicy: 'cache-first',
  })

  return { file: data?.readFile, loading, error }
}
