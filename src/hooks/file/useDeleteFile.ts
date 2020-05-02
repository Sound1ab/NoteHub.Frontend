import { useApolloClient, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
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

export function useDeleteFile() {
  const client = useApolloClient()

  const [mutation, ...rest] = useMutation<
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

  async function deleteFile(path?: string | null) {
    if (!path) {
      alert('Delete file: no path provided')
      return
    }

    const filename = extractFilename(path)

    try {
      client.writeData({
        data: { currentFileName: null },
      })
      await mutation({
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
            type: 'file',
            url: 'optimistic',
          },
        },
      })
    } catch {
      alert('There was an issue deleting your file, please try again')
    }
  }

  return [deleteFile, ...rest]
}
