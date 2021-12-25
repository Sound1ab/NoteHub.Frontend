import { useCallback } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
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

export function useGit() {
  const [repo] = useRepo()

  const dir = repo.split('/')[1]

  const jwt = useReadJwt()

  const add = useCallback(
    async (filepath: string) => {
      try {
        return gitAdd({ dir: `/${dir}`, filepath: removeFirstSlug(filepath) })
      } catch (error) {
        if (error instanceof Error) {
          ErrorToast(`Git add error: ${error.message}`)
        }
      }
    },
    [dir]
  )

  const getStatusForFile = useCallback(async (filepath: string) => {
    try {
      return gitGetStatusForFile({ filepath })
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git get status error: ${error.message}`)
      }
    }
  }, [])

  const getUnstagedChanges = useCallback(async () => {
    try {
      return gitGetUnstagedChanges({ dir: `/${dir}` })
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git get unstaged changes: ${error.message}`)
      }
      return []
    }
  }, [dir])

  const addAll = useCallback(
    async (unstagedChanges: string[]) => {
      try {
        await gitAddAll({
          dir: `/${dir}`,
          unstagedChanges,
        })
      } catch (error) {
        if (error instanceof Error) {
          ErrorToast(`Git stage changes: ${error.message}`)
        }
      }
    },
    [dir]
  )

  const commit = useCallback(async () => {
    try {
      await gitCommit({
        dir: `/${dir}`,
      })
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git commit: ${error.message}`)
      }
    }
  }, [dir])

  const rollback = useCallback(async () => {
    try {
      await gitRollback({
        dir: `/${dir}`,
      })
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git rollback: ${error.message}`)
      }
    }
  }, [dir])

  const status = useCallback(async () => {
    try {
      const result = await gitStatus({
        dir: `/${dir}`,
      })
      return result
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git status: ${error.message}`)
      }
    }
  }, [dir])

  const getCommittedChanges = useCallback(async () => {
    try {
      const changes = await gitGetCommittedChanges({
        dir: `/${dir}`,
      })

      return changes
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git get committed changes: ${error.message}`)
      }
      return []
    }
  }, [dir])

  const clone = useCallback(
    async (repo: string) => {
      try {
        await gitClone({
          url: `https://github.com/${repo}`,
          dir: `/${dir}`,
          jwt,
        })
      } catch (error) {
        if (error instanceof Error) {
          ErrorToast(`Git clone: ${error.message}`)
        }
      }
    },
    [jwt, dir]
  )

  const push = useCallback(async () => {
    try {
      await gitPush({
        dir: `/${dir}`,
        jwt,
      })
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git push: ${error.message}`)
      }
    }
  }, [jwt, dir])

  const remove = useCallback(
    async (filepath: string) => {
      try {
        await gitRemove({
          dir: `/${dir}`,
          filepath: removeFirstSlug(filepath),
        })
      } catch (error) {
        if (error instanceof Error) {
          ErrorToast(`Git push: ${error.message}`)
        }
      }
    },
    [dir]
  )

  const removeAll = useCallback(
    async (deletedUnstagedChanges: string[] | never[]) => {
      try {
        await gitRemoveAll({
          dir: `/${dir}`,
          deletedUnstagedChanges,
        })
      } catch (error) {
        if (error instanceof Error) {
          ErrorToast(`Git push: ${error.message}`)
        }
      }
    },
    [dir]
  )

  const getDeletedUnstagedChanges = useCallback(async () => {
    try {
      const result = await gitGetDeletedUnstagedChanges({
        dir: `/${dir}`,
      })

      return result
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git get deleted unstaged changes: ${error.message}`)
      }
      return []
    }
  }, [dir])

  const log = useCallback(async () => {
    try {
      const result = await gitLog({
        dir: `/${dir}`,
      })

      return result
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git log: ${error.message}`)
      }
      return []
    }
  }, [dir])

  const getCommits = useCallback(async () => {
    try {
      const result = await gitGetCommits({
        dir: `/${dir}`,
      })

      return result
    } catch (error) {
      if (error instanceof Error) {
        ErrorToast(`Git log: ${error.message}`)
      }
      return []
    }
  }, [dir])

  const resetIndex = useCallback(
    async (filepath: string) => {
      try {
        const result = await gitResetIndex({
          dir: `/${dir}`,
          filepath: removeFirstSlug(filepath),
        })

        return result
      } catch (error) {
        if (error instanceof Error) {
          ErrorToast(`Git reset index: ${error.message}`)
        }
      }
    },
    [dir]
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
