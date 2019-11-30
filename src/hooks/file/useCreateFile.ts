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
import { useReadCurrentRepoName } from '../Repo/useReadCurrentRepoName'
import { useReadGithubUser } from '../user/useReadGithubUser'

export const CreateFileDocument = gql`
  ${FileFragment}
  mutation CreateFile($input: CreateFileInput!) {
    createFile(input: $input) {
      ...file
    }
  }
`

export function useCreateFile() {
  const { currentRepoName } = useReadCurrentRepoName()
  const user = useReadGithubUser()

  return useMutation<CreateFileMutation, CreateFileMutationVariables>(
    CreateFileDocument,
    {
      update: (cache, { data }) => {
        const newFile = data && data.createFile
        if (!newFile || !user || !currentRepoName) return

        const result = cache.readQuery<ListFilesQuery, ListFilesQueryVariables>(
          {
            query: ListFilesDocument,
            variables: {
              repo: currentRepoName,
              username: user.login,
            },
          }
        )

        if (!result?.listFiles.items) {
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
            repo: currentRepoName,
            username: user.login,
          },
        })
      },
    }
  )
}
