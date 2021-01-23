import { fs } from './index'
import { stat } from './utils/stat'

export interface IReadDir {
  dir: string
}

export async function readDir({ dir }: IReadDir): Promise<string[]> {
  return fs.promises.readdir(dir, undefined)
}

export interface IReadDirRecursive {
  dir: string
}

// TODO: SPLIT INTO MODULES AND WRITE TESTS
export async function readDirRecursive({ dir }: IReadDirRecursive) {
  const subdirs = await readDir({ dir })

  const files: (string | string[])[] = await Promise.all(
    subdirs
      .filter((subdir) => subdir !== '.git')
      .map(async (subdir) => {
        const path = dir === '/' ? `/${subdir}` : `${dir}/${subdir}`

        return (await stat({ path })).isDirectory()
          ? readDirRecursive({ dir: path })
          : path.slice(1) // remove leading slash ()
      })
  )

  return files.flat()
}

export interface IReadFile {
  filepath: string
}

export async function readFile({
  filepath,
}: IReadFile): Promise<string | Uint8Array> {
  return fs.promises.readFile(filepath, { encoding: 'utf8' })
}
