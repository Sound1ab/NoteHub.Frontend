import { IAdd, IAddAll, add as gitAdd, addAll as gitAddAll } from '../git/add'
import { IClone, clone as gitClone } from '../git/clone'
import { ICommit, commit as gitCommit } from '../git/commit'
import { IGetTree, getTree as gitGetTree } from '../git/getTree'
import { IPush, push as gitPush } from '../git/push'
import {
  IRemove,
  IRemoveAll,
  remove as gitRemove,
  removeAll as gitRemoveAll,
} from '../git/remove'
import { IRollback, rollback as gitRollback } from '../git/rollback'
import {
  IGetCommittedChanges,
  IStatus,
  getCommittedChanges as gitGetCommittedChanges,
  getDeletedUnstagedChanges as gitGetDeletedUnstagedChanges,
  getUnstagedChanges as gitGetUnstagedChanges,
  status as gitStatus,
} from '../git/status'

export async function clone(options: Pick<IClone, 'url' | 'dir' | 'jwt'>) {
  return gitClone(options)
}

export async function getTree(options: IGetTree) {
  return gitGetTree(options)
}

export async function status(options: IStatus) {
  return gitStatus(options)
}

export async function getDeletedUnstagedChanges(options: IStatus) {
  return gitGetDeletedUnstagedChanges(options)
}

export async function getUnstagedChanges(options: IStatus) {
  return gitGetUnstagedChanges(options)
}

export async function getCommittedChanges(options: IGetCommittedChanges) {
  return gitGetCommittedChanges(options)
}

export async function addAll(options: IAddAll) {
  return gitAddAll(options)
}

export async function add(options: IAdd) {
  return gitAdd(options)
}

export async function commit(options: ICommit) {
  return gitCommit(options)
}

export async function rollback(options: IRollback) {
  return gitRollback(options)
}

export async function push(options: IPush) {
  return gitPush(options)
}

export async function remove(options: IRemove) {
  return gitRemove(options)
}

export async function removeAll(options: IRemoveAll) {
  return gitRemoveAll(options)
}
