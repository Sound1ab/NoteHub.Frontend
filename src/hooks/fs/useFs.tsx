import { useCallback, useState } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import FSWorker from '../../services/worker/loaders/fs'
import GitWorker from '../../services/worker/loaders/git'

export function useFs() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    ErrorToast(error.message)
    setError(null)
  }

  const readFile = useCallback(async (path: string) => {
    setLoading(true)
    try {
      const content: string = await FSWorker.readFile({
        filepath: `/test-dir/${path}`,
      })

      return content
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const writeFile = useCallback(async (path: string, content: string) => {
    setLoading(true)
    try {
      await FSWorker.writeFile({
        filepath: `/test-dir/${path}`,
        content,
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const listFiles = useCallback(async () => {
    setLoading(true)
    try {
      const files = await GitWorker.listFiles({
        dir: '/test-dir',
        optimisticPaths: [],
      })

      return files
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return [
    { readFile, writeFile, listFiles },
    { loading, error },
  ]
}
