import { MutationResult } from '@apollo/react-common'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { debounce } from '../../utils'
import { ReadFileDocument, useReadFile } from './useReadFile'

let abortController: AbortController

const debouncedSave = debounce((updateFile, options) => {
  const controller = new window.AbortController()
  abortController = controller

  updateFile({
    ...options,
    context: { fetchOptions: { signal: controller.signal } },
  })
}, 1000)

export const UpdateFileDocument = gql`
  ${FileFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
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
    if (!path || !content || !file) {
      alert('Missing some details needed to update file')
      return
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
