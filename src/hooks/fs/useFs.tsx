import { useCallback } from 'react'

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
  const [repo] = useRepo()

  const dir = repo.split('/')[1]

  const readFile = useCallback(async (path: string) => {
    try {
      const content = await fsReadFile({
        filepath: `/${path}`,
      })

      if (typeof content === 'string') {
        return content
      }

      return new TextDecoder('utf-8').decode(content)
    } catch (error) {
      ErrorToast(`FS read: ${error.message}`)
    }
  }, [])

  const writeFile = useCallback(async (path: string, content: string) => {
    try {
      await fsWriteFile({
        filepath: `/${path}`,
        content,
      })
    } catch (error) {
      ErrorToast(`FS write: ${error.message}`)
    }
  }, [])

  const rename = useCallback(
    async (oldFilePath: string, newFilePath: string) => {
      try {
        await fsRename({
          oldFilePath: `/${oldFilePath}`,
          newFilePath: `/${newFilePath}`,
        })
      } catch (error) {
        ErrorToast(`FS rename: ${error.message}`)
      }
    },
    []
  )

  const readDirRecursive = useCallback(async () => {
    try {
      const files = await fsReadDirRecursive({ dir: `/${dir}` })

      return files.map((path) => ({
        path,
        isOptimistic: false,
        type: Node_Type.File,
      }))
    } catch (error) {
      ErrorToast(`FS read recursive: ${error.message}`)
      return []
    }
  }, [dir])

  const unlink = useCallback(async (filepath: string) => {
    try {
      await fsUnlink({
        filepath: `/${filepath}`,
      })
    } catch (error) {
      ErrorToast(`FS rename: ${error.message}`)
    }
  }, [])

  return {
    readFile,
    writeFile,
    rename,
    readDirRecursive,
    unlink,
  }
}
