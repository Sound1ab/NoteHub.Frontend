import { debounce } from '../../utils'
import {
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
  const user = useReadGithubUser()
  const [updateFile] = useUpdateFile()
  const { file, loading } = useReadFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const path = file && `${currentRepoName}-${file.path}`

  const setValue = (newValue: string) => {
    if (!file || !user) {
      return
    }

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
