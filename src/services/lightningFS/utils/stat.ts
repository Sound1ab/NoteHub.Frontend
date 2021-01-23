import { fs } from '../index'

export interface IStat {
  path: string
}

export async function stat({ path }: IStat) {
  return fs.promises.stat(path)
}
