import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  ListFilesQuery,
  ListFilesQueryVariables,
  ReadFileQuery,
  ReadFileQueryVariables,
  UpdateFileMutation,
  UpdateFileMutationVariables,
} from '../../components/apollo/generated_components_typings'
import { FileFragment } from '../../fragments'
import { ReadFileDocument } from './useReadFile'
import { ListFilesDocument, useReadGithubUser } from '..'

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

        if (updatedFile.oldFilename) {
          const result = cache.readQuery<
            ListFilesQuery,
            ListFilesQueryVariables
          >({
            query: ListFilesDocument,
            variables: {
              repo: updatedFile.repo,
              username: user.login,
            },
          })

          const previousFiles = result?.listFiles.items || []

          cache.writeQuery<ListFilesQuery, ListFilesQueryVariables>({
            data: {
              ...result,
              listFiles: {
                ...result?.listFiles,
                items: previousFiles.map(file => {
                  if (file.filename === updatedFile.oldFilename) {
                    return {
                      ...file,
                      filename: updatedFile.filename,
                    }
                  } else {
                    return file
                  }
                }),
              },
            },
            query: ListFilesDocument,
            variables: {
              repo: updatedFile.repo,
              username: user.login,
            },
          })
        }
      },
    }
  )
}
