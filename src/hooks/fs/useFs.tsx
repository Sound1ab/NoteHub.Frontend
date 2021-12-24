import { useCallback, useState } from 'react'

import { Node_Type } from '../../components/apollo/generated_components_typings'
import { ErrorToast } from '../../components/atoms/Toast/Toast'
import {
  readDirRecursive as fsReadDirRecursive,
  readFile as fsReadFile,
  rename as fsRename,
  unlink as fsUnlink,
  writeFile as fsWriteFile,
} from '../../services/worker/fs.worker'
import { useRepo } from '../recoil/useRepo'

export function useFs() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [repo] = useRepo()

  const dir = repo.split('/')[1]

  if (error) {
    ErrorToast(error)
    setError(null)
  }

  const readFile = useCallback(async (path: string) => {
    setLoading(true)
    try {
      const content = await fsReadFile({
        filepath: `/${path}`,
      })

      if (typeof content === 'string') {
        return content
      }

      return new TextDecoder('utf-8').decode(content)
    } catch (error) {
      setError(`FS read: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const writeFile = useCallback(async (path: string, content: string) => {
    setLoading(true)
    try {
      await fsWriteFile({
        filepath: `/${path}`,
        content,
      })
    } catch (error) {
      setError(`FS write: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const rename = useCallback(
    async (oldFilePath: string, newFilePath: string) => {
      setLoading(true)
      try {
        await fsRename({
          oldFilePath: `/${oldFilePath}`,
          newFilePath: `/${newFilePath}`,
        })
      } catch (error) {
        setError(`FS rename: ${error.message}`)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const readDirRecursive = useCallback(async () => {
    setLoading(true)
    try {
      const files = await fsReadDirRecursive({ dir: `/${dir}` })

      return files.map((path) => ({
        path,
        isOptimistic: false,
        type: Node_Type.File,
      }))
    } catch (error) {
      setError(`FS read recursive: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [dir])

  const unlink = useCallback(async (filepath: string) => {
    setLoading(true)
    try {
      await fsUnlink({
        filepath: `/${filepath}`,
      })
    } catch (error) {
      setError(`FS rename: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    actions: { readFile, writeFile, rename, readDirRecursive, unlink },
    meta: { loading, error },
  }
}
