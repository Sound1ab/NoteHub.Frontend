import { MutationResult, StoreValue, gql, useMutation } from '@apollo/client'

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
  (node: ITreeNode | null, newPath: string) => Promise<File | null | undefined>,
  MutationResult<MoveFileMutation>
] {
  const [mutation, mutationResult] = useMutation<
    MoveFileMutation,
    MoveFileMutationVariables
  >(MoveFileDocument, {
    errorPolicy: 'all',
  })

  async function moveFile(node: ITreeNode | null, newPath: string) {
    if (!node?.path) {
      throw new Error('Move file: no path provided')
    }

    const { path, type, name, id } = node

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

              cache.evict(file)
              cache.gc()

              return existingFileRefs.map(
                (ref: File & { [storeFieldName: string]: StoreValue }) =>
                  readField('id', ref) === id ? newFileRef : ref
              )
            },
          },
        })
      },
    })

    return data?.moveFile
  }

  return [moveFile, mutationResult]
}
