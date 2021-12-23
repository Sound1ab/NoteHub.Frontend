import { useCallback, useState } from 'react'

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
  rollback as gitRollback,
  status as gitStatus,
} from '../../services/worker/git.worker'
import { removeFirstSlug } from '../../utils/removeFirstSlug'
import { useReadJwt } from '../localState/useReadJwt'
import { useRepo } from '../recoil/useRepo'

export function useGit() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [repo] = useRepo()

  const dir = repo.split('/')[1]

  const jwt = useReadJwt()

  if (error) {
    ErrorToast(error)
    setError(null)
  }

  const add = useCallback(
    async (path: string) => {
      setLoading(true)
      try {
        return gitAdd({ dir: `/${dir}`, path: removeFirstSlug(path) })
      } catch (error) {
        setError(`Git add error: ${error.message}`)
      } finally {
        setLoading(false)
      }
    },
    [dir]
  )

  const getStatusForFile = useCallback(async (filepath: string) => {
    setLoading(true)
    try {
      return gitGetStatusForFile({ filepath })
    } catch (error) {
      setError(`Git get status error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const getUnstagedChanges = useCallback(async () => {
    setLoading(true)
    try {
      return gitGetUnstagedChanges({ dir: `/${dir}` })
    } catch (error) {
      setError(`Git get unstaged changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [dir])

  const addAll = useCallback(
    async (unstagedChanges: string[]) => {
      setLoading(true)
      try {
        await gitAddAll({
          dir: `/${dir}`,
          unstagedChanges,
        })
      } catch (error) {
        setError(`Git stage changes: ${error.message}`)
      } finally {
        setLoading(false)
      }
    },
    [dir]
  )

  const commit = useCallback(async () => {
    setLoading(true)
    try {
      await gitCommit({
        dir: `/${dir}`,
      })
    } catch (error) {
      setError(`Git commit: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [dir])

  const rollback = useCallback(async () => {
    setLoading(true)
    try {
      await gitRollback({
        dir: `/${dir}`,
      })
    } catch (error) {
      setError(`Git rollback: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [dir])

  const status = useCallback(async () => {
    setLoading(true)
    try {
      const result = await gitStatus({
        dir: `/${dir}`,
      })
      return result
    } catch (error) {
      setError(`Git status: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [dir])

  const getCommittedChanges = useCallback(async () => {
    setLoading(true)
    try {
      const changes = await gitGetCommittedChanges({
        dir: `/${dir}`,
      })

      return changes
    } catch (error) {
      setError(`Git get committed changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [dir])

  const clone = useCallback(
    async (repo: string) => {
      setLoading(true)

      try {
        await gitClone({
          url: `https://github.com/${repo}`,
          dir: `/${dir}`,
          jwt,
        })
      } catch (error) {
        setError(`Git clone: ${error.message}`)
      } finally {
        setLoading(false)
      }
    },
    [jwt, dir]
  )

  const push = useCallback(async () => {
    try {
      // await refresh()

      await gitPush({
        dir: `/${dir}`,
        jwt,
      })
    } catch (error) {
      setError(`Git push: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [jwt, dir])

  const remove = useCallback(
    async (filepath: string) => {
      try {
        await gitRemove({
          dir: `/${dir}`,
          filepath,
        })
      } catch (error) {
        setError(`Git push: ${error.message}`)
      } finally {
        setLoading(false)
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
        setError(`Git push: ${error.message}`)
      } finally {
        setLoading(false)
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
      setError(`Git get deleted unstaged changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [dir])

  const log = useCallback(async () => {
    try {
      const result = await gitLog({
        dir: `/${dir}`,
      })

      return result
    } catch (error) {
      setError(`Git log: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [dir])

  const getCommits = useCallback(async () => {
    try {
      const result = await gitGetCommits({
        dir: `/${dir}`,
      })

      return result
    } catch (error) {
      setError(`Git log: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [dir])

  return {
    actions: {
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
    },
    meta: { loading, error },
  }
}
