import { fs } from './index'

export interface IUnlink {
  filepath: string
}

export async function unlink({ filepath }: IUnlink) {
  return fs.promises.unlink(filepath)
}
