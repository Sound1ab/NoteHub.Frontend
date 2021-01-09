import { GitProgressEvent } from 'isomorphic-git'

import {
  IClone,
  ICommit,
  ICommittedChanges,
  IListFiles,
  IPush,
  IRollback,
  IStageChanges,
  IStatus,
  clone as gitClone,
  commit as gitCommit,
  committedChanges as gitCommittedChanges,
  listFiles as gitListFiles,
  push as gitPush,
  rollback as gitRollback,
  stageChanges as gitStageChanges,
  status as gitStatus,
  unstagedChanges as gitUnstagedChanges,
} from '../../git'

export async function clone(options: Pick<IClone, 'url' | 'dir'>) {
  return gitClone({
    ...options,
    onProgress: (progress: GitProgressEvent) => console.log('here', progress),
    onMessage: (message) => console.log('here', message),
  })
}

export async function listFiles(options: IListFiles) {
  return gitListFiles(options)
}

export async function status(options: IStatus) {
  return gitStatus(options)
}

export async function unstagedChanges(options: IStatus) {
  return gitUnstagedChanges(options)
}

export async function stageChanges(options: IStageChanges) {
  return gitStageChanges(options)
}

export async function commit(options: ICommit) {
  return gitCommit(options)
}

export async function rollback(options: IRollback) {
  return gitRollback(options)
}

export async function committedChanges(options: ICommittedChanges) {
  return gitCommittedChanges(options)
}

export async function push(options: IPush) {
  return gitPush(options)
}
