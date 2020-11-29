import { MutationResult, gql, useMutation } from '@apollo/client'
import { StoreValue } from '@apollo/client/utilities/graphql/storeUtils'
import { ExecutionResult } from 'graphql'

import {
  CreateFileMutation,
  CreateFileMutationVariables,
  Node_Type,
} from '../../components/apollo'
import { FileFragment } from '../../fragments'
import { extractFilename } from '../../utils'
import { useReadActiveRetextSettings } from '..'

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
  const { activeRetextSettings } = useReadActiveRetextSettings()

  const [mutation, mutationResult] = useMutation<
    CreateFileMutation,
    CreateFileMutationVariables
  >(CreateFileDocument, {
    errorPolicy: 'all',
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          readFiles(existingFileRefs = [], { readField }) {
            const file = data && data.createFile

            const newFileRef = cache.writeFragment({
              data: file,
              fragment: FileFragment,
              fragmentName: 'file',
            })

            if (!file) {
              return existingFileRefs
            }

            if (
              existingFileRefs.some(
                (ref: File & { [storeFieldName: string]: StoreValue }) =>
                  readField('id', ref) === file.id
              )
            ) {
              return existingFileRefs
            }

            return [...existingFileRefs, newFileRef]
          },
        },
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
          retextSettings: activeRetextSettings,
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
