import { commit as gitCommit } from 'isomorphic-git'

import { fs } from '../lightningFS'

export interface ICommit {
  dir: string
  message?: string
}

export async function commit({
  dir,
  message = `note(update file): ${name} - ${new Date().toDateString()}`,
}: ICommit) {
  return gitCommit({
    fs,
    dir,
    message,
    author: { email: 'pp@pp.com', name: 'sound' },
  })
}
