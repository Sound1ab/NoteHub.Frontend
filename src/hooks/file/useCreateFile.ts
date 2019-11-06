import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  CreateFileMutation,
  CreateFileMutationVariables,
  ListFilesDocument,
  ListFilesQuery,
  ListFilesQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'

export const CreateFileDocument = gql`
  ${FileFragment}
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      ...file
    }
  }
`

export function useCreateFile(username: string, repo: string) {
  return useMutation<CreateFileMutation, CreateFileMutationVariables>(
    CreateFileDocument,
    {
      update: (cache, { data }) => {
        const newFile = data && data.createFile
        if (!newFile) return
        if (!repo) {
          alert('No active repo to save note to')
        }

        const result = cache.readQuery<ListFilesQuery, ListFilesQueryVariables>(
          {
            query: ListFilesDocument,
            variables: {
              repo,
              username,
            },
          }
        )

        if (!result || !result.listFiles || !result.listFiles.items) {
          return
        }

        cache.writeQuery<ListFilesQuery, ListFilesQueryVariables>({
          data: {
            listFiles: {
              ...result.listFiles,
              items: [newFile, ...result.listFiles.items],
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
