import FS from '@isomorphic-git/lightning-fs'

export const fs = new FS('fs', { wipe: true })

export interface IReadDir {
  dir: string
}

export async function readDir({ dir }: IReadDir): Promise<string[]> {
  return fs.promises.readdir(dir, undefined)
}

export interface IReadDirRecursive {
  dir: string
}

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

export interface IStat {
  path: string
}

export async function stat({ path }: IStat) {
  return fs.promises.stat(path)
}

export interface IReadFile {
  filepath: string
}

export async function readFile({
  filepath,
}: IReadFile): Promise<string | Uint8Array> {
  return fs.promises.readFile(filepath, { encoding: 'utf8' })
}

export interface IWriteFile {
  filepath: string
  content: string
}

export async function writeFile({ filepath, content }: IWriteFile) {
  return fs.promises.writeFile(filepath, content, {
    encoding: 'utf8',
    mode: 0o777,
  })
}

export interface IRename {
  oldFilePath: string
  newFilePath: string
}

export async function rename({ oldFilePath, newFilePath }: IRename) {
  return fs.promises.rename(oldFilePath, newFilePath)
}
