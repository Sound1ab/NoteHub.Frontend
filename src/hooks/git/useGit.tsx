import { useCallback, useState } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import {
  addAll as gitAddAll,
  clone as gitClone,
  commit as gitCommit,
  getCommittedChanges as gitGetCommittedChanges,
  getDeletedUnstagedChanges as gitGetDeletedUnstagedChanges,
  getUnstagedChanges as gitGetUnstagedChanges,
  push as gitPush,
  remove as gitRemove,
  removeAll as gitRemoveAll,
  rollback as gitRollback,
  status as gitStatus,
} from '../../services/worker/git.worker'
import { useReadJwt } from '../localState/useReadJwt'

type UseGitReturn = [
  {
    getUnstagedChanges: () => Promise<string[] | never[]>
    addAll: (unstagedChanges: string[]) => Promise<void>
    commit: () => Promise<void>
    rollback: (unstagedChanges: string[]) => Promise<void>
    status: () => Promise<
      [string, 0 | 1, 0 | 2 | 1, 0 | 2 | 1 | 3][] | undefined
    >
    getCommittedChanges: () => Promise<string[] | never[]>
    clone: (repo: string) => Promise<void>
    push: () => Promise<void>
    remove: (filepath: string) => Promise<void>
    removeAll: (deletedUnstagedChanges: string[] | never[]) => Promise<void>
    getDeletedUnstagedChanges: () => Promise<string[] | never[]>
  },
  { loading: boolean; error: string | null }
]

export function useGit(): UseGitReturn {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const jwt = useReadJwt()

  if (error) {
    ErrorToast(error)
    setError(null)
  }

  const getUnstagedChanges = useCallback(async () => {
    setLoading(true)
    try {
      return gitGetUnstagedChanges({ dir: '/' })
    } catch (error) {
      setError(`Git get unstaged changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const addAll = useCallback(async (unstagedChanges: string[]) => {
    setLoading(true)
    try {
      await gitAddAll({
        dir: '/',
        unstagedChanges,
      })
    } catch (error) {
      setError(`Git stage changes: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const commit = useCallback(async () => {
    setLoading(true)
    try {
      await gitCommit({
        dir: '/',
      })
    } catch (error) {
      setError(`Git commit: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const rollback = useCallback(async (unstagedChanges: string[]) => {
    setLoading(true)
    try {
      await gitRollback({
        dir: '/',
        unstagedChanges,
      })
    } catch (error) {
      setError(`Git rollback: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const status = useCallback(async () => {
    setLoading(true)
    try {
      const result = await gitStatus({
        dir: '/',
      })
      return result
    } catch (error) {
      setError(`Git status: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const getCommittedChanges = useCallback(async () => {
    setLoading(true)
    try {
      const changes = await gitGetCommittedChanges({
        dir: '/',
      })

      return changes
    } catch (error) {
      setError(`Git get committed changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const clone = useCallback(
    async (repo: string) => {
      try {
        await gitClone({
          url: repo,
          dir: '/',
          jwt,
        })
      } catch (error) {
        setError(`Git clone: ${error.message}`)
      } finally {
        setLoading(false)
      }
    },
    [jwt]
  )

  const push = useCallback(async () => {
    try {
      await gitPush({
        dir: '/',
        jwt,
      })
    } catch (error) {
      setError(`Git push: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [jwt])

  const remove = useCallback(async (filepath: string) => {
    try {
      await gitRemove({
        dir: '/',
        filepath,
      })
    } catch (error) {
      setError(`Git push: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeAll = useCallback(
    async (deletedUnstagedChanges: string[] | never[]) => {
      try {
        await gitRemoveAll({
          dir: '/',
          deletedUnstagedChanges,
        })
      } catch (error) {
        setError(`Git push: ${error.message}`)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getDeletedUnstagedChanges = useCallback(async () => {
    try {
      const result = await gitGetDeletedUnstagedChanges({
        dir: '/',
      })

      return result
    } catch (error) {
      setError(`Git get deleted unstaged changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

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
    },
    { loading, error },
  ]
}
