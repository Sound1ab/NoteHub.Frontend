import { fs } from './index'

export interface IRename {
  oldFilePath: string
  newFilePath: string
}

export async function rename({ oldFilePath, newFilePath }: IRename) {
  return fs.promises.rename(oldFilePath, newFilePath)
}
