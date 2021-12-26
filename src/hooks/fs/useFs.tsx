import { useCallback } from 'react'

import { Node_Type } from '../../components/apollo/generated_components_typings'
import {
  readDirRecursive as fsReadDirRecursive,
  readFile as fsReadFile,
  rename as fsRename,
  unlink as fsUnlink,
  writeFile as fsWriteFile,
} from '../../services/worker/fs.worker'
import { useRepo } from '../recoil/useRepo'
import { useError } from '../utils/useError'

export function useFs() {
  const { withError } = useError()
  const [repo] = useRepo()

  const dir = repo.split('/')[1]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readFile = useCallback(
    withError(async (path: string) => {
      const content = await fsReadFile({
        filepath: `/${path}`,
      })

      if (typeof content === 'string') {
        return content
      }

      return new TextDecoder('utf-8').decode(content)
    }, 'FS read'),
    [withError]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const writeFile = useCallback(
    withError(async (path: string, content: string) => {
      await fsWriteFile({
        filepath: `/${path}`,
        content,
      })
    }, 'FS write'),
    [withError]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rename = useCallback(
    withError(async (oldFilePath: string, newFilePath: string) => {
      await fsRename({
        oldFilePath: `/${oldFilePath}`,
        newFilePath: `/${newFilePath}`,
      })
    }, 'FS rename'),
    [withError]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const readDirRecursive = useCallback(
    withError(async () => {
      const files = await fsReadDirRecursive({ dir: `/${dir}` })

      return files.map((path) => ({
        path,
        isOptimistic: false,
        type: Node_Type.File,
      }))
    }, 'FS read recursive'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unlink = useCallback(
    withError(async (filepath: string) => {
      await fsUnlink({
        filepath: `/${filepath}`,
      })
    }, 'FS rename'),
    [withError]
  )

  return {
    readFile,
    writeFile,
    rename,
    readDirRecursive,
    unlink,
  }
}
