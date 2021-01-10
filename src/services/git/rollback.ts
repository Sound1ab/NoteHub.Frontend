import { checkout } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface IRollback {
  dir: string
  unstagedChanges: string[]
}

export async function rollback({ dir, unstagedChanges }: IRollback) {
  return checkout({
    fs,
    dir,
    force: true,
    filepaths: unstagedChanges,
  })
}
