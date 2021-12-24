import { resetIndex as gitResetIndex } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface IResetIndex {
  dir: string
  filepath: string
}

export async function resetIndex({ dir, filepath }: IResetIndex) {
  return gitResetIndex({
    fs,
    dir,
    filepath,
  })
}
