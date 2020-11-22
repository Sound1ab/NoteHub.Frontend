import { MutationResult, gql, useMutation } from '@apollo/client'
import { ExecutionResult } from 'graphql'

import {
  CreateFileMutation,
  CreateFileMutationVariables,
  Node_Type,
  ReadFilesQuery,
  ReadFilesQueryVariables,
} from '../../components/apollo'
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

      const result = cache.readQuery<ReadFilesQuery, ReadFilesQueryVariables>({
        query: ReadNodesDocument,
      })

      if (!result?.readFiles) {
        throw new Error('Create file: No nodes found in cache result')
      }

      cache.writeQuery<ReadFilesQuery, ReadFilesQueryVariables>({
        data: {
          readFiles: [...result.readFiles, { ...file, __typename: 'File' }],
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
          id: 'optimistic',
          filename,
          path,
          content: `# ${filename}`,
          sha: 'optimistic',
          type: Node_Type.File,
          url: 'optimistic',
        },
      },
    })
  }

  return [createFile, mutationResult]
}
