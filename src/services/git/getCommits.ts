import { findMergeBase, resolveRef } from 'isomorphic-git'

import { fs } from '../lightningFS'
import { log } from './log'

export interface IGetCommits {
  dir: string
}

export async function getCommits({ dir }: IGetCommits) {
  const currentCommit = await resolveRef({ fs, dir, ref: 'HEAD' })

  const currentRemoteCommit = await resolveRef({
    fs,
    dir,
    ref: 'refs/remotes/origin/main',
  })

  const [mergeBase] = await findMergeBase({
    fs,
    dir,
    oids: [currentCommit, currentRemoteCommit],
  })

  const result = await log({
    dir,
  })

  const mergeBaseIndex = result.findIndex((commit) => commit.oid === mergeBase)

  return result.slice(0, mergeBaseIndex)
}
