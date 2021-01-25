import { checkout } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface IRollback {
  dir: string
}

export async function rollback({ dir }: IRollback) {
  return checkout({
    fs,
    dir,
    force: true,
  })
}
