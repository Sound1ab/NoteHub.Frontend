import { MutationResult } from '@apollo/react-common'
import { ExecutionResult } from '@apollo/react-common/lib/types/types'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  CreateFileMutation,
  CreateFileMutationVariables,
  ReadNodesQuery,
  ReadNodesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils/extractFilename'
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
  (path: string) => Promise<ExecutionResult<CreateFileMutation>>,
  MutationResult<CreateFileMutation>
] {
  const [mutation, rest] = useMutation<
    CreateFileMutation,
    CreateFileMutationVariables
  >(CreateFileDocument, {
    update: (cache, { data }) => {
      const file = data && data.createFile

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

  async function createFile(path: string) {
    if (!path) {
      throw new Error('Create file: missing path')
    }

    const filename = extractFilename(path)
      .toLowerCase()
      .replace(/ /gi, '-')
      .replace(/\//gi, '')

    try {
      return mutation({
        variables: {
          input: {
            content: `# ${name}`,
            path,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createFile: {
            __typename: 'File',
            filename: `${filename}.md`,
            path,
            content: `# ${name}`,
            excerpt: null,
            sha: 'optimistic',
            type: 'file',
            url: 'optimistic',
          },
        },
      })
    } catch {
      throw new Error('Could not update file')
    }
  }

  return [createFile, rest]
}
