import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  ListFilesQuery,
  ListFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { useReadGithubUser, useReadCurrentRepoName } from '..'
import { ListFilesDocument } from './useListFiles'

export const DeleteFileDocument = gql`
  ${FileFragment}
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
`

export function useDeleteFile() {
  const { currentRepoName } = useReadCurrentRepoName()
  const user = useReadGithubUser()

  return useMutation<DeleteFileMutation, DeleteFileMutationVariables>(
    DeleteFileDocument,
    {
      update: (cache, { data }) => {
        const deletedFile = data && data.deleteFile
        if (!deletedFile || !currentRepoName || !user) return

        const result = cache.readQuery<ListFilesQuery, ListFilesQueryVariables>(
          {
            query: ListFilesDocument,
            variables: {
              repo: currentRepoName,
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
            repo: currentRepoName,
            username: user.login,
          },
        })
      },
    }
  )
}
