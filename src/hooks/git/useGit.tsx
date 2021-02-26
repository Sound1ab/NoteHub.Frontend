import { ReadCommitResult } from 'isomorphic-git'
import { useCallback, useState } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import {
  addAll as gitAddAll,
  clone as gitClone,
  commit as gitCommit,
  getCommits as gitGetCommits,
  getCommittedChanges as gitGetCommittedChanges,
  getDeletedUnstagedChanges as gitGetDeletedUnstagedChanges,
  getUnstagedChanges as gitGetUnstagedChanges,
  log as gitLog,
  push as gitPush,
  remove as gitRemove,
  removeAll as gitRemoveAll,
  rollback as gitRollback,
  status as gitStatus,
} from '../../services/worker/git.worker'
import { useLazyRefresh } from '../authorization/useRefresh'
import { useReadJwt } from '../localState/useReadJwt'
import { useRepo } from '../recoil/useRepo'

type UseGitReturn = [
  {
    getUnstagedChanges: () => Promise<string[] | never[]>
    addAll: (unstagedChanges: string[]) => Promise<void>
    commit: () => Promise<void>
    rollback: () => Promise<void>
    status: () => Promise<
      [string, 0 | 1, 0 | 2 | 1, 0 | 2 | 1 | 3][] | undefined
    >
    getCommittedChanges: () => Promise<string[] | never[]>
    clone: (repo: string) => Promise<void>
    push: () => Promise<void>
    remove: (filepath: string) => Promise<void>
    removeAll: (deletedUnstagedChanges: string[] | never[]) => Promise<void>
    getDeletedUnstagedChanges: () => Promise<string[] | never[]>
    log: () => Promise<ReadCommitResult[]>
    getCommits: () => Promise<ReadCommitResult[]>
  },
  { loading: boolean; error: string | null }
]

export function useGit(): UseGitReturn {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [repo] = useRepo()
  const [refresh] = useLazyRefresh()

  const dir = repo.split('/')[1]

  const jwt = useReadJwt()

  if (error) {
    ErrorToast(error)
    setError(null)
  }

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
  }, [refresh, jwt, dir])

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

  return [
    {
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
    },
    { loading, error },
  ]
}
