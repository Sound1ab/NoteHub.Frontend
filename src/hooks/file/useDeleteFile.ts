import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  Node_Type,
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils/extractFilename'
import { ReadNodesDocument } from '..'

export const DeleteFileDocument = gql`
  ${FileFragment}
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
`

export function useDeleteFile(): [
  (path?: string) => Promise<ExecutionResult<DeleteFileMutation>>,
  MutationResult<DeleteFileMutation>
] {
  const client = useApolloClient()

  const [mutation, mutationResult] = useMutation<
    DeleteFileMutation,
    DeleteFileMutationVariables
  >(DeleteFileDocument, {
    update: (cache, { data }) => {
      const file = data && data.deleteFile

      if (!file) {
        return
      }

      const result = cache.readQuery<ReadNodesQuery, ReadNodesQueryVariables>({
        query: ReadNodesDocument,
      })

      if (!result?.readNodes.nodes) {
        return
      }

      cache.writeQuery<ReadNodesQuery, ReadNodesQueryVariables>({
        data: {
          readNodes: {
            ...result.readNodes,
            nodes: result.readNodes.nodes.filter(
              gitNode => gitNode.path !== file.path
            ),
          },
        },
        query: ReadNodesDocument,
      })
    },
  })

  async function deleteFile(path?: string) {
    if (!path) {
      throw new Error('Delete file: no path provided')
    }

    const filename = extractFilename(path)

    try {
      client.writeData({
        data: { currentPath: null },
      })
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
            filename,
            path,
            content: '',
            excerpt: null,
            sha: 'optimistic',
            type: Node_Type.File,
            url: 'optimistic',
          },
        },
      })
    } catch {
      throw new Error('There was an issue deleting your file, please try again')
    }
  }

  return [deleteFile, mutationResult]
}
