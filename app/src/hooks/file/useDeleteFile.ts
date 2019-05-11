import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  DeleteFileMutation,
  DeleteFileMutationVariables,
  ListFilesDocument,
  ListFilesQuery,
  ListFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const DeleteFileDocument = gql`
  ${FileFragment}
  mutation DeleteFile($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      ...file
    }
  }
`

export function useDeleteFile(username: string, repo: string) {
  return useMutation<DeleteFileMutation, DeleteFileMutationVariables>(
    DeleteFileDocument,
    {
      update: (cache, { data }) => {
        const deletedFile = data && data.deleteFile
        if (!deletedFile) return

        const result = cache.readQuery<ListFilesQuery, ListFilesQueryVariables>(
          {
            query: ListFilesDocument,
            variables: {
              repo,
              username,
            },
          }
        )

        const files =
          (result && result.listFiles && result.listFiles.items) || []
        const listFiles = result && result.listFiles

        cache.writeQuery<ListFilesQuery, ListFilesQueryVariables>({
          data: {
            listFiles: {
              ...listFiles,
              items: files.filter(
                file => file && file.filename !== deletedFile.filename
              ),
            },
          },
          query: ListFilesDocument,
          variables: {
            repo,
            username,
          },
        })
      },
    }
  )
}
