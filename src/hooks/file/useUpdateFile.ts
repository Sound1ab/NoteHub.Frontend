import {
  MutationResult,
  gql,
  useApolloClient,
  useMutation,
} from '@apollo/client'
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
import { FileFragment } from '../../fragments'
import { debounce } from '../../utils'
import { useReadActiveRetextSettings } from '..'

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
  ${FileFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
`

export function useUpdateFile(): [
  (file?: File | null, content?: string) => void,
  MutationResult<UpdateFileMutation>
] {
  const client = useApolloClient()
  const { activeRetextSettings } = useReadActiveRetextSettings()

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

    client.cache.modify({
      id: client.cache.identify(file),
      fields: {
        content() {
          return content
        },
      },
    })

    abortController && abortController.abort()

    await debouncedSave(mutation, {
      variables: {
        input: {
          content,
          path: file.path,
          retextSettings: activeRetextSettings,
        },
      },
    })
  }

  return [updateFile, mutationResult]
}
