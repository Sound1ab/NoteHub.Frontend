import { debounce } from '../../utils'
import { useEffect, useRef, useState } from 'react'
import { File } from '../../components/apollo/generated_components_typings'
import { useStore } from '../useStore'
import { useUpdateFile } from '../file/useUpdateFile'
import { useReadFile } from '../file/useReadFile'

let abortController: AbortController

const debouncedSave = debounce((updateFile, options) => {
  const controller = new window.AbortController()
  abortController = controller

  console.log('options', options)

  updateFile({
    ...options,
    context: { fetchOptions: { signal: controller.signal } },
  })
}, 1000)

export function useFile() {
  const [stateValue, setStateValue] = useState('')
  const latestFile = useRef<File | null | undefined>(null)
  const [
    {
      user: { username },
      repo: {
        activeRepo: { name },
        activeFile: { filename },
      },
    },
  ] = useStore()
  const updateFile = useUpdateFile(username, name, filename)
  const { file, loading } = useReadFile(username, name, filename)

  useEffect(() => {
    latestFile.current = file
  }, [file])

  const path = file && `${name}-${file.path}`

  const content = file?.content

  useEffect(() => {
    setStateValue(latestFile?.current?.content ?? '')
  }, [content])

  const setValue = (newValue: string) => {
    if (
      !file ||
      typeof file.content !== 'string' ||
      newValue === stateValue ||
      latestFile?.current?.path !== file.path
    ) {
      return
    }

    setStateValue(newValue)

    abortController && abortController.abort()

    debouncedSave(updateFile, {
      variables: {
        input: {
          content: newValue,
          filename,
          repo: name,
          username: username,
        },
      },
    })
  }

  return {
    value: stateValue,
    setValue,
    loading,
    path,
  }
}
