import { stat } from './stat'

interface IExists {
  path: string
}

export async function exists(options: IExists) {
  try {
    await stat(options)
    return true
  } catch (err) {
    if (isFsError(err)) {
      if (err?.code === 'ENOENT' || err?.code === 'ENOTDIR') {
        return false
      } else {
        console.log('Unhandled error in "FileSystem.exists()" function', err)
        throw err
      }
    }
  }
}

function isFsError(err: unknown): err is { code: string } {
  return Boolean(typeof err === 'object' && err !== null && 'code' in err)
}
