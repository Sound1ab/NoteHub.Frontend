import { MutationResult, gql, useMutation } from '@apollo/client'
import { StoreValue } from '@apollo/client/utilities/graphql/storeUtils'
import { ExecutionResult } from 'graphql'

import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  File,
} from '../../components/apollo/generated_components_typings'
import { localState } from '../../components/providers/ApolloProvider/cache'
import { FileFragment } from '../../fragments'
import { ITreeNode } from '../../types'
import { useReadTabs } from '../localState/useReadTabs'

export const DeleteFileDocument = gql`
  ${FileFragment}
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
`

export function useDeleteFile(): [
  (file?: ITreeNode) => Promise<ExecutionResult<DeleteFileMutation>>,
  MutationResult<DeleteFileMutation>
] {
  const tabs = useReadTabs()

  const [mutation, mutationResult] = useMutation<
    DeleteFileMutation,
    DeleteFileMutationVariables
  >(DeleteFileDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          readFiles(existingFileRefs = []) {
            const file = data && data.deleteFile

            if (!file) {
              return existingFileRefs
            }

            const id = cache.identify(file)

            if (id) {
              cache.evict({ id })
            }

            tabs.delete(file.path)

            localState.tabsVar(new Set(tabs))

            return existingFileRefs.filter(
              (cachedFiles: File & { [storeFieldName: string]: StoreValue }) =>
                cachedFiles.path !== file.path
            )
          },
        },
      })
    },
    errorPolicy: 'all',
  })

  async function deleteFile(file?: ITreeNode) {
    if (!file?.path) {
      throw new Error('Delete file: no path provided')
    }

    const { path, type, name, id } = file

    return mutation({
      variables: {
        input: {
          path,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteFile: {
          __typename: 'File',
          id,
          filename: name,
          path,
          content: '',
          sha: 'optimistic',
          type,
          url: 'optimistic',
        },
      },
    })
  }

  return [deleteFile, mutationResult]
}
