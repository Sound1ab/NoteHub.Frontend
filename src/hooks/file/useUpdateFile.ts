import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import {
  ReadFileDocument,
  ReadFileQuery,
  ReadFileQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { useReadCurrentRepoName } from '../Repo/useReadCurrentRepoName'
import { useReadCurrentFileName } from './useReadCurrentFileName'
import { useReadGithubUser } from '../user/useReadGithubUser'

export const UpdateFileDocument = gql`
  ${FileFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
`

export function useUpdateFile() {
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const user = useReadGithubUser()

  return useMutation<UpdateFileMutation, UpdateFileMutationVariables>(
    UpdateFileDocument,
    {
      update: (cache, { data }) => {
        const updatedFile = data && data.updateFile
        if (!updatedFile) return

        console.log(updatedFile.content)

        cache.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
          data: {
            readFile: updatedFile,
          },
          query: ReadFileDocument,
          variables: {
            filename: currentFileName ?? '',
            repo: currentRepoName ?? '',
            username: user?.name ?? '',
          },
        })
      },
    }
  )
}
