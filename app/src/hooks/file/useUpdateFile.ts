import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  ListFilesDocument,
  ListFilesQuery,
  ListFilesQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const UpdateFileDocument = gql`
  ${FileFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
`

export function useUpdateFile(username: string, repo: string, file: string) {
  return useMutation<UpdateFileMutation, UpdateFileMutationVariables>(
    UpdateFileDocument,
    {
      update: (cache, { data }) => {
        const updatedFile = data && data.updateFile
        if (!updatedFile) return

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

        cache.writeQuery<ListFilesQuery, ListFilesQueryVariables>({
          data: {
            listFiles: {
              __typename: 'ModelFileConnection',
              items: files
                .filter(savedFiles => savedFiles && savedFiles.name !== file)
                .concat([{ ...updatedFile, __typename: 'File' }]),
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
