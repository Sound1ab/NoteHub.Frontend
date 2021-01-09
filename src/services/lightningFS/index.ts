import FS from '@isomorphic-git/lightning-fs'

export const fs = new FS('fs', { wipe: true })

export interface IReadDir {
  filepath: string
}

export async function readDir({ filepath }: IReadDir): Promise<string[]> {
  console.log('filepath', filepath)
  const test = await fs.promises.readdir(filepath, undefined)
  console.log('here', test)
  return test
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
  console.log('here', filepath, content)
  return fs.promises.writeFile(filepath, content, {
    encoding: 'utf8',
    mode: 0o777,
  })
}
