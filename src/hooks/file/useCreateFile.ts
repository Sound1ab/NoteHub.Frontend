import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  CreateFileMutation,
  CreateFileMutationVariables,
  Node_Type,
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils'
import { ReadNodesDocument } from './useReadNodes'

export const CreateFileDocument = gql`
  ${FileFragment}
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      ...file
    }
  }
`

export function useCreateFile(): [
  (
    path: string,
    content?: string
  ) => Promise<ExecutionResult<CreateFileMutation>>,
  MutationResult<CreateFileMutation>
] {
  const [mutation, mutationResult] = useMutation<
    CreateFileMutation,
    CreateFileMutationVariables
  >(CreateFileDocument, {
    errorPolicy: 'all',
    update: (cache, { data }) => {
      const file = data && data.createFile

      if (!file) {
        throw new Error('Create file: No file returned')
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
            nodes: [
              ...result.readNodes.nodes,
              { ...file, __typename: 'GitNode' },
            ],
          },
        },
        query: ReadNodesDocument,
      })
    },
  })

  async function createFile(path: string, content?: string) {
    if (!path) {
      throw new Error('Create file: Missing path')
    }

    const filename = extractFilename(path)
      .toLowerCase()
      .replace(/ /gi, '-')
      .replace(/\//gi, '')

    return mutation({
      variables: {
        input: {
          content: content ? content : `# ${filename}`,
          path,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createFile: {
          __typename: 'File',
          filename,
          path,
          content: `# ${filename}`,
          excerpt: null,
          sha: 'optimistic',
          type: Node_Type.File,
          url: 'optimistic',
        },
      },
    })
  }

  return [createFile, mutationResult]
}
