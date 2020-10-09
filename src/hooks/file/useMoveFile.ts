import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  MoveFileMutation,
  MoveFileMutationVariables,
  Node_Type,
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils'
import { ReadNodesDocument, useReadCurrentPath } from '..'

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
  let oldPath: string
  const { currentPath } = useReadCurrentPath()
  const client = useApolloClient()

  const [mutation, mutationResult] = useMutation<
    MoveFileMutation,
    MoveFileMutationVariables
  >(MoveFileDocument, {
    update: (cache, { data }) => {
      const movedFile = data && data.moveFile

      if (!movedFile) {
        throw new Error('Move file: No file returned')
      }

      const result = cache.readQuery<ReadNodesQuery, ReadNodesQueryVariables>({
        query: ReadNodesDocument,
      })

      if (!result?.readNodes.nodes) {
        throw new Error('Create file: No nodes found in cache result')
      }

      cache.writeQuery<ReadNodesQuery, ReadNodesQueryVariables>({
        data: {
          readNodes: {
            ...result.readNodes,
            nodes: result.readNodes.nodes.map((node) => {
              return node.path === oldPath
                ? {
                    ...movedFile,
                    __typename: 'GitNode',
                  }
                : node
            }),
          },
        },
        query: ReadNodesDocument,
      })

      // If the file is currently selected, make sure to update the cache
      // to the new file name after server change so the item stays activated
      // in list
      if (oldPath === currentPath && movedFile.sha !== 'optimistic') {
        client.writeData({
          data: { currentPath: movedFile.path },
        })
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
          filename,
          path: newPath,
          content: 'optimistic',
          excerpt: null,
          sha: 'optimistic',
          type: Node_Type.File,
          url: 'optimistic',
        },
      },
    })
  }

  return [moveFile, mutationResult]
}
