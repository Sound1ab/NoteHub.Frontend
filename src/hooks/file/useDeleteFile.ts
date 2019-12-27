import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  ListFilesQuery,
  ListFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { ListFilesDocument } from './useListFiles'
import { useReadGithubUser } from '..'

export const DeleteFileDocument = gql`
  ${FileFragment}
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
`

export function useDeleteFile() {
  const user = useReadGithubUser()

  return useMutation<DeleteFileMutation, DeleteFileMutationVariables>(
    DeleteFileDocument,
    {
      update: (cache, { data }) => {
        const deletedFile = data && data.deleteFile
        if (!deletedFile || !user) return

        const result = cache.readQuery<ListFilesQuery, ListFilesQueryVariables>(
          {
            query: ListFilesDocument,
            variables: {
              repo: deletedFile.repo,
              username: user.login,
            },
          }
        )

        const files = result?.listFiles.items ?? []
        const listFiles = result?.listFiles

        cache.writeQuery<ListFilesQuery, ListFilesQueryVariables>({
          data: {
            listFiles: {
              ...listFiles,
              items: files.filter(
                file => file.filename !== deletedFile.filename
              ),
            },
          },
          query: ListFilesDocument,
          variables: {
            repo: deletedFile.repo,
            username: user.login,
          },
        })
      },
    }
  )
}
