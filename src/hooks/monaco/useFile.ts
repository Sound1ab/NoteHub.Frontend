import { useApolloClient } from '@apollo/react-hooks'

import {
  ReadFileQuery,
  ReadFileQueryVariables,
} from '../../components/apollo/generated_components_typings'
import { debounce } from '../../utils'
import {
  ReadFileDocument,
  useReadCurrentRepoName,
  useReadFile,
  useReadGithubUser,
  useUpdateFile,
} from '..'

let abortController: AbortController

const debouncedSave = debounce((updateFile, options) => {
  const controller = new window.AbortController()
  abortController = controller

  updateFile({
    ...options,
    context: { fetchOptions: { signal: controller.signal } },
  })
}, 1000)

export function useFile() {
  const client = useApolloClient()
  const user = useReadGithubUser()
  const [updateFile] = useUpdateFile()
  const { file, loading } = useReadFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const path = file && `${currentRepoName}-${file.path}`

  const setValue = (newValue: string) => {
    if (!file || !user) {
      return
    }

    client.writeQuery<ReadFileQuery, ReadFileQueryVariables>({
      data: {
        readFile: {
          ...file,
          content: newValue,
        },
      },
      query: ReadFileDocument,
      variables: {
        filename: file.filename,
        repo: file.repo,
        username: user.login,
      },
    })

    abortController && abortController.abort()

    debouncedSave(updateFile, {
      variables: {
        input: {
          content: newValue,
          filename: file.filename,
          repo: currentRepoName,
          username: user.login,
        },
      },
    })
  }

  return {
    value: file?.content ?? '',
    setValue,
    loading,
    path,
  }
}
