import { useCallback } from 'react'

import {
  add as gitAdd,
  addAll as gitAddAll,
  clone as gitClone,
  commit as gitCommit,
  getCommits as gitGetCommits,
  getCommittedChanges as gitGetCommittedChanges,
  getDeletedUnstagedChanges as gitGetDeletedUnstagedChanges,
  getStatusForFile as gitGetStatusForFile,
  getUnstagedChanges as gitGetUnstagedChanges,
  log as gitLog,
  push as gitPush,
  remove as gitRemove,
  removeAll as gitRemoveAll,
  resetIndex as gitResetIndex,
  rollback as gitRollback,
  status as gitStatus,
} from '../../services/worker/git.worker'
import { removeFirstSlug } from '../../utils/removeFirstSlug'
import { useReadJwt } from '../localState/useReadJwt'
import { useRepo } from '../recoil/useRepo'
import { useError } from '../utils/useError'

export function useGit() {
  const { withError } = useError()
  const [repo] = useRepo()
  const jwt = useReadJwt()

  const dir = repo.split('/')[1]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const add = useCallback(
    withError(async (filepath: string) => {
      return gitAdd({ dir: `/${dir}`, filepath: removeFirstSlug(filepath) })
    }, 'Git add'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStatusForFile = useCallback(
    withError(async (filepath: string) => {
      return gitGetStatusForFile({ filepath })
    }, 'Git get status'),
    [withError]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUnstagedChanges = useCallback(
    withError(async () => {
      return gitGetUnstagedChanges({ dir: `/${dir}` })
    }, 'Git get unstaged changes'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addAll = useCallback(
    withError(async (unstagedChanges: string[]) => {
      await gitAddAll({
        dir: `/${dir}`,
        unstagedChanges,
      })
    }, 'Git stage changes'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const commit = useCallback(
    withError(async () => {
      await gitCommit({
        dir: `/${dir}`,
      })
    }, 'Git commit'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rollback = useCallback(
    withError(async () => {
      await gitRollback({
        dir: `/${dir}`,
      })
    }, 'Git rollback'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const status = useCallback(
    withError(async () => {
      return await gitStatus({
        dir: `/${dir}`,
      })
    }, 'Git status'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCommittedChanges = useCallback(
    withError(async () => {
      return await gitGetCommittedChanges({
        dir: `/${dir}`,
      })
    }, 'Git get committed changes'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clone = useCallback(
    withError(async (repo: string) => {
      await gitClone({
        url: `https://github.com/${repo}`,
        dir: `/${dir}`,
        jwt,
      })
    }, 'Git clone'),
    [withError, dir, jwt]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const push = useCallback(
    withError(async () => {
      await gitPush({
        dir: `/${dir}`,
        jwt,
      })
    }, 'Git push'),
    [withError, dir, jwt]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const remove = useCallback(
    withError(async (filepath: string) => {
      await gitRemove({
        dir: `/${dir}`,
        filepath: removeFirstSlug(filepath),
      })
    }, 'Git push'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const removeAll = useCallback(
    withError(async (deletedUnstagedChanges: string[] | never[]) => {
      await gitRemoveAll({
        dir: `/${dir}`,
        deletedUnstagedChanges,
      })
    }, 'Remove all'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDeletedUnstagedChanges = useCallback(
    withError(async () => {
      return await gitGetDeletedUnstagedChanges({
        dir: `/${dir}`,
      })
    }, 'Git get deleted unstaged changes'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const log = useCallback(
    withError(async () => {
      return await gitLog({
        dir: `/${dir}`,
      })
    }, 'Git log'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCommits = useCallback(
    withError(async () => {
      return await gitGetCommits({
        dir: `/${dir}`,
      })
    }, 'Git get commits'),
    [withError, dir]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetIndex = useCallback(
    withError(async (filepath: string) => {
      return await gitResetIndex({
        dir: `/${dir}`,
        filepath: removeFirstSlug(filepath),
      })
    }, 'Git reset index'),
    [withError, dir]
  )

  return {
    getUnstagedChanges,
    addAll,
    commit,
    rollback,
    status,
    getCommittedChanges,
    clone,
    push,
    remove,
    getDeletedUnstagedChanges,
    removeAll,
    log,
    getCommits,
    getStatusForFile,
    add,
    resetIndex,
  }
}
