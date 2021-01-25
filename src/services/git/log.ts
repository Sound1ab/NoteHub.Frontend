import { log as gitLog } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface ILog {
  dir: string
}

export function log({ dir }: ILog) {
  return gitLog({
    fs,
    dir,
    depth: 50,
    ref: 'HEAD',
  })
}
