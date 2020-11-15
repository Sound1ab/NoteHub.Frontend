import {
  MutationResult,
  gql,
  useApolloClient,
  useMutation,
} from '@apollo/client'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo'
import { FileWithMessagesFragment } from '../../fragments'
import { debounce } from '../../utils'
import { ReadFileDocument, useReadFile } from './useReadFile'

let abortController: AbortController

const debouncedSave = debounce((updateFile, options) => {
  const controller = new window.AbortController()
  abortController = controller

  if (typeof updateFile !== 'function' || typeof options !== 'object') {
    return
  }

  updateFile({
    ...options,
    context: { fetchOptions: { signal: controller.signal } },
  })
}, 1000)

export const UpdateFileDocument = gql`
  ${FileWithMessagesFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...fileWithMessages
    }
  }
`

export function useUpdateFile(): [
  (path?: string | null, content?: string) => void,
  MutationResult<UpdateFileMutation>
] {
  const { file } = useReadFile()
  const client = useApolloClient()

  const [mutation, mutationResult] = useMutation<
    UpdateFileMutation,
    UpdateFileMutationVariables
  >(UpdateFileDocument, {
    update: (cache, { data }) => {
      const file = data && data.updateFile

      if (!file) {
        return
      }

      cache.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
        data: {
          readFile: file,
        },
        query: ReadFileDocument,
        variables: {
          path: file.path,
        },
      })
    },
  })

  function updateFile(path?: string | null, content?: string) {
    if (!path) {
      throw new Error('Update file: no file path')
    }

    if (!file) {
      throw new Error('Update file: no file')
    }

    if (typeof content !== 'string') {
      throw new Error('Update file: content is not a string')
    }

    client.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
      data: {
        readFile: {
          ...file,
          content,
        },
      },
      query: ReadFileDocument,
      variables: {
        path: file.path,
      },
    })

    abortController && abortController.abort()

    debouncedSave(mutation, {
      variables: {
        input: {
          content,
          path,
        },
      },
    })
  }

  return [updateFile, mutationResult]
}
