import { add as gitAdd } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface IAddAll {
  dir: string
  unstagedChanges: string[]
}

export async function addAll({ dir, unstagedChanges }: IAddAll) {
  for (const path of unstagedChanges) {
    await gitAdd({ fs, dir, filepath: path })
  }
}

export interface IAdd {
  dir: string
  path: string
}

export async function add({ dir, path }: IAdd) {
  return await gitAdd({ fs, dir, filepath: path })
}
