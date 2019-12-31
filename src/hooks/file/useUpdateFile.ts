import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { ReadFileDocument } from './useReadFile'
import { useReadGithubUser } from '..'

export const UpdateFileDocument = gql`
  ${FileFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
`

export function useUpdateFile() {
  const user = useReadGithubUser()

  return useMutation<UpdateFileMutation, UpdateFileMutationVariables>(
    UpdateFileDocument,
    {
      update: (cache, { data }) => {
        const updatedFile = data && data.updateFile
        if (!updatedFile || !user) {
          return
        }

        cache.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
          data: {
            readFile: updatedFile,
          },
          query: ReadFileDocument,
          variables: {
            filename: updatedFile.filename,
            repo: updatedFile.repo,
            username: user.login,
          },
        })
      },
    }
  )
}
