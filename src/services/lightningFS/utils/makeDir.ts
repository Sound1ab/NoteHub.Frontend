import { fs } from '../index'

interface IMakeDir {
  filepath: string
}

export async function makeDir({ filepath }: IMakeDir) {
  return fs.promises.mkdir(filepath)
}
