import { useState } from 'react'

import FSWorker from '../../services/worker/loaders/fs'
import { useGit } from '../git/useGit'

export function useUpdateFile(): [
  (path?: string, content?: string) => void,
  { error: Error | null; loading: boolean }
] {
  const [{ getUnstagedChanges }] = useGit()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  async function updateFile(path?: string, content?: string) {
    if (!path) {
      throw new Error('Update file: no file')
    }

    if (typeof content !== 'string') {
      throw new Error('Update file: content is not a string')
    }

    setLoading(true)

    try {
      console.log('path', path)
      const test = await FSWorker.writeFile({
        filepath: `/test-dir/${path}`,
        content,
      })

      await getUnstagedChanges?.()
      console.log('here', test)
    } catch (error) {
      console.log('here', error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return [updateFile, { loading, error }]
}
