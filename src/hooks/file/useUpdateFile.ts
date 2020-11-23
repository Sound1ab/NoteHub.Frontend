import { MutationResult, gql, useMutation } from '@apollo/client'
import { FetchResult } from '@apollo/client/link/core'
import {
  MutationFunctionOptions,
  MutationHookOptions,
} from '@apollo/client/react/types/types'

import {
  File,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo'
import { FileWithMessagesFragment } from '../../fragments'
import { debounce } from '../../utils'

let abortController: AbortController

const debouncedSave = debounce(
  async (
    mutation: (
      options?: MutationFunctionOptions<
        UpdateFileMutation,
        UpdateFileMutationVariables
      >
    ) => Promise<FetchResult<UpdateFileMutation>>,
    options?: MutationHookOptions<
      UpdateFileMutation,
      UpdateFileMutationVariables
    >
  ) => {
    const controller = new window.AbortController()

    abortController = controller

    await mutation({
      ...options,
      context: { fetchOptions: { signal: controller.signal } },
    })
  },
  1000
)

export const UpdateFileDocument = gql`
  ${FileWithMessagesFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...fileWithMessages
    }
  }
`

export function useUpdateFile(): [
  (file?: File | null, content?: string) => void,
  MutationResult<UpdateFileMutation>
] {
  const [mutation, mutationResult] = useMutation<
    UpdateFileMutation,
    UpdateFileMutationVariables
  >(UpdateFileDocument)

  async function updateFile(file?: File | null, content?: string) {
    if (!file) {
      throw new Error('Update file: no file')
    }

    if (typeof content !== 'string') {
      throw new Error('Update file: content is not a string')
    }

    abortController && abortController.abort()

    await debouncedSave(mutation, {
      variables: {
        input: {
          content,
          path: file.path,
        },
      },
    })
  }

  return [updateFile, mutationResult]
}
