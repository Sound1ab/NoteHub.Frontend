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

export const UpdateFileDocument = gql`
  ${FileFragment}
  mutation UpdateFile($input: UpdateFileInput!) {
    updateFile(input: $input) {
      ...file
    }
  }
`

export function useUpdateFile(
  username: string,
  repo: string,
  filename: string,
) {
  return useMutation<UpdateFileMutation, UpdateFileMutationVariables>(
    UpdateFileDocument,
    {
      update: (cache, { data }) => {
        const updatedFile = data && data.updateFile
        if (!updatedFile) return

        cache.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
          data: {
            readFile: updatedFile,
          },
          query: ReadFileDocument,
          variables: {
            filename,
            repo,
            username,
          },
        })
      },
    }
  )
}
