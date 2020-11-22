import { MutationResult, gql, useMutation } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  MoveFileMutation,
  MoveFileMutationVariables,
  Node_Type,
  ReadFilesQuery,
  ReadFilesQueryVariables,
} from '../../components/apollo'
import { localState } from '../../components/providers/ApolloProvider/cache'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils'
import { ReadFilesDocument, useReadCurrentPath } from '..'

export const MoveFileDocument = gql`
  ${FileFragment}
  mutation MoveFile($input: MoveFileInput!) {
    moveFile(input: $input) {
      ...file
    }
  }
`

export function useMoveFile(): [
  (
    newPath: string,
    path?: string
  ) => Promise<ExecutionResult<MoveFileMutation>>,
  MutationResult<MoveFileMutation>
] {
  const currentPath = useReadCurrentPath()

  let oldPath: string

  const [mutation, mutationResult] = useMutation<
    MoveFileMutation,
    MoveFileMutationVariables
  >(MoveFileDocument, {
    update: (cache, { data }) => {
      const movedFile = data && data.moveFile

      if (!movedFile) {
        throw new Error('Move file: No file returned')
      }

      const result = cache.readQuery<ReadFilesQuery, ReadFilesQueryVariables>({
        query: ReadFilesDocument,
      })

      if (!result?.readFiles) {
        throw new Error('Create file: No nodes found in cache result')
      }

      cache.writeQuery<ReadFilesQuery, ReadFilesQueryVariables>({
        data: {
          readFiles: result.readFiles.map((node) => {
            return node.path === oldPath
              ? {
                  ...movedFile,
                  __typename: 'File',
                }
              : node
          }),
        },
        query: ReadFilesDocument,
      })

      // If the file is currently selected, make sure to update the cache
      // to the new file name after server change so the item stays activated
      // in list
      if (oldPath === currentPath && movedFile.sha !== 'optimistic') {
        localState.currentPathVar(movedFile.path)
      }
    },
    errorPolicy: 'all',
  })

  async function moveFile(newPath: string, path?: string) {
    if (!path) {
      throw new Error('Move file: no path provided')
    }

    // Needed to update the cache in update function
    oldPath = path

    const filename = extractFilename(newPath)

    return mutation({
      variables: {
        input: {
          path,
          newPath,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        moveFile: {
          __typename: 'File',
          id: 'optimistic',
          filename,
          path: newPath,
          content: 'optimistic',
          sha: 'optimistic',
          type: Node_Type.File,
          url: 'optimistic',
        },
      },
    })
  }

  return [moveFile, mutationResult]
}
