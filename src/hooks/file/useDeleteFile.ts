import {
  ApolloCache,
  DataProxy,
  MutationResult,
  gql,
  useMutation,
} from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  Node_Type,
  ReadFilesQuery,
  ReadFilesQueryVariables,
} from '../../components/apollo'
import { localState } from '../../components/providers/ApolloProvider/cache'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils'
import { ReadNodesDocument } from '..'

export const DeleteFileDocument = gql`
  ${FileFragment}
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
`

function removeNode(cache: DataProxy, data?: DeleteFileMutation | null) {
  const file = data?.deleteFile

  if (!file) {
    throw new Error('Delete file: no file returned')
  }

  const result = cache.readQuery<ReadFilesQuery, ReadFilesQueryVariables>({
    query: ReadNodesDocument,
  })

  if (!result?.readFiles) {
    throw new Error('Delete file: No nodes found')
  }

  cache.writeQuery<ReadFilesQuery, ReadFilesQueryVariables>({
    data: {
      readFiles: result.readFiles.filter(
        (cachedFiles) => cachedFiles.path !== file.path
      ),
    },
    query: ReadNodesDocument,
  })
}

function removeFile(
  cache: ApolloCache<unknown>,
  data?: DeleteFileMutation | null
) {
  const file = data?.deleteFile

  if (!file) {
    throw new Error('Delete file: no file returned')
  }

  // @ts-ignore
  Object.keys(cache.data.data).forEach(
    // @ts-ignore
    (key) => key.match(/^\$ROOT_QUERY.readFile/) && cache.data.delete(key)
  )
}

export function useDeleteFile(): [
  (path?: string) => Promise<ExecutionResult<DeleteFileMutation>>,
  MutationResult<DeleteFileMutation>
] {
  const [mutation, mutationResult] = useMutation<
    DeleteFileMutation,
    DeleteFileMutationVariables
  >(DeleteFileDocument, {
    update: (cache, { data }) => {
      removeNode(cache, data)
      removeFile(cache, data)
    },
    errorPolicy: 'all',
  })

  async function deleteFile(path?: string) {
    if (!path) {
      throw new Error('Delete file: no path provided')
    }

    const filename = extractFilename(path)

    localState.currentPathVar('')

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
          id: 'optimistic',
          filename,
          path,
          content: '',
          sha: 'optimistic',
          type: Node_Type.File,
          url: 'optimistic',
        },
      },
    })
  }

  return [deleteFile, mutationResult]
}
