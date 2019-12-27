import { useEffect, useState } from 'react'

import { debounce } from '../../utils'
import {
  useReadCurrentFileName,
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
  const [stateValue, setStateValue] = useState('')
  const user = useReadGithubUser()
  const [updateFile] = useUpdateFile()
  const { file, loading } = useReadFile()
  const { currentRepoName } = useReadCurrentRepoName()
  const { currentFileName } = useReadCurrentFileName()
  const path = file && `${currentRepoName}-${file.path}`

  useEffect(() => {
    // If content updates but user selects a new file
    // do not update state with new result from useReadFile
    if (file?.filename !== currentFileName) {
      return
    }
    setStateValue(file?.content ?? '')
  }, [file?.content, file?.filename])

  const setValue = (newValue: string) => {
    setStateValue(newValue)

    abortController && abortController.abort()

    debouncedSave(updateFile, {
      variables: {
        input: {
          content: newValue,
          filename: file?.filename ?? '',
          repo: currentRepoName,
          username: user?.login,
        },
      },
    })
  }

  return {
    value: stateValue ?? '',
    setValue,
    loading,
    path,
  }
}
