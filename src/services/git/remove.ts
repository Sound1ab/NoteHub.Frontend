import { remove as gitRemove } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface IRemove {
  dir: string
  filepath: string
}

export async function remove({ dir, filepath }: IRemove) {
  return gitRemove({
    fs,
    dir,
    filepath,
  })
}

export interface IRemoveAll {
  dir: string
  deletedUnstagedChanges: string[] | never[]
}

export async function removeAll({ dir, deletedUnstagedChanges }: IRemoveAll) {
  for (const path of deletedUnstagedChanges) {
    await remove({ dir, filepath: path })
  }
}
