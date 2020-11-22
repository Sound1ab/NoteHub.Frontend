import { MutationResult, gql, useMutation } from '@apollo/client'
import { StoreValue } from '@apollo/client/utilities/graphql/storeUtils'

import {
  File,
  MoveFileMutation,
  MoveFileMutationVariables,
} from '../../components/apollo'
import { FileFragment } from '../../fragments'
import { ITreeNode } from '../../types'

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
    file?: ITreeNode | null
  ) => Promise<File | null | undefined>,
  MutationResult<MoveFileMutation>
] {
  let oldFile: ITreeNode

  const [mutation, mutationResult] = useMutation<
    MoveFileMutation,
    MoveFileMutationVariables
  >(MoveFileDocument, {
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          readFiles(existingFileRefs = [], { readField }) {
            const file = data && data.moveFile

            const newFileRef = cache.writeFragment({
              data: file,
              fragment: FileFragment,
              fragmentName: 'file',
            })

            if (!file) {
              return existingFileRefs
            }

            cache.evict(oldFile)
            cache.gc()

            return existingFileRefs.map(
              (ref: File & { [storeFieldName: string]: StoreValue }) =>
                readField('id', ref) === oldFile.id ? newFileRef : ref
            )
          },
        },
      })
    },
    errorPolicy: 'all',
  })

  async function moveFile(newPath: string, file?: ITreeNode | null) {
    if (!file?.path) {
      throw new Error('Move file: no path provided')
    }

    const { path, type, name, id } = file

    // Needed to update the cache in update function
    oldFile = file

    const { data } = await mutation({
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
          id,
          filename: name,
          path: newPath,
          content: '',
          sha: 'optimistic',
          type,
          url: 'optimistic',
        },
      },
    })

    return data?.moveFile
  }

  return [moveFile, mutationResult]
}
