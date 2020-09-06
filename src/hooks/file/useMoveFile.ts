import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  MoveFileMutation,
  MoveFileMutationVariables,
  Node_Type,
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils'
import { ReadNodesDocument, useReadFile } from '..'

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
  const { file } = useReadFile()

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
            nodes: result.readNodes.nodes.map(node => {
              return node.path === file?.path
                ? { ...movedFile, __typename: 'GitNode' }
                : node
            }),
          },
        },
        query: ReadNodesDocument,
      })
    },
    errorPolicy: 'all',
  })

  async function moveFile(newPath: string, path?: string) {
    if (!path) {
      throw new Error('Move file: no path provided')
    }

    const filename = extractFilename(newPath)

    // client.writeData({
    //   data: { currentPath: null },
    // })
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
