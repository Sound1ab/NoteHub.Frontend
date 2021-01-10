import { useCallback, useState } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import { IGitTreeNode } from '../../services/git/types'
import {
  readFile as fsReadFile,
  rename as fsRename,
  writeFile as fsWriteFile,
} from '../../services/worker/fs.worker'
import { listFiles as gitListFiles } from '../../services/worker/git.worker'

type UseFSReturn = [
  {
    readFile: (path: string) => Promise<string | undefined>
    writeFile: (path: string, content: string) => Promise<void>
    listFiles: () => Promise<IGitTreeNode[] | never[]>
    rename: (oldFilePath: string, newFilePath: string) => Promise<void>
  },
  { loading: boolean; error: Error | null }
]

export function useFs(): UseFSReturn {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    ErrorToast(error.message)
    setError(null)
  }

  const readFile = useCallback(async (path: string) => {
    setLoading(true)
    try {
      const content = await fsReadFile({
        filepath: `/test-dir/${path}`,
      })

      if (typeof content === 'string') {
        return content
      }

      return new TextDecoder('utf-8').decode(content)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const writeFile = useCallback(async (path: string, content: string) => {
    setLoading(true)
    try {
      await fsWriteFile({
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
      const files = await gitListFiles({
        dir: '/test-dir',
        optimisticPaths: [],
      })

      return files
    } catch (error) {
      setError(error)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const rename = useCallback(
    async (oldFilePath: string, newFilePath: string) => {
      setLoading(true)
      try {
        await fsRename({
          oldFilePath: `/test-dir/${oldFilePath}`,
          newFilePath: `/test-dir/${newFilePath}`,
        })
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return [
    { readFile, writeFile, listFiles, rename },
    { loading, error },
  ]
}
