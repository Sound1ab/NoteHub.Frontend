import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import {
  ReadFileQuery,
  ReadFileQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import {
  useReadCurrentRepoName,
  useReadCurrentFileName,
  useReadGithubUser,
} from '..'
import { ReadFileDocument } from './useReadFile'

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
        if (!updatedFile || !currentFileName || !currentRepoName || !user)
          return

        console.log(updatedFile.content)

        cache.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
          data: {
            readFile: updatedFile,
          },
          query: ReadFileDocument,
          variables: {
            filename: currentFileName,
            repo: currentRepoName,
            username: user.login,
          },
        })
      },
    }
  )
}
