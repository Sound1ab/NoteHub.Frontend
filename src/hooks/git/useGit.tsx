import { useCallback, useState } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import {
  committedChanges,
  clone as gitClone,
  commit as gitCommit,
  push as gitPush,
  rollback as gitRollback,
  stageChanges as gitStageChanges,
  status as gitStatus,
  unstagedChanges,
} from '../../services/worker/git.worker'

type UseGitReturn = [
  {
    getUnstagedChanges: () => Promise<string[] | never[]>
    stageChanges: (unstagedChanges: string[]) => Promise<void>
    commit: () => Promise<void>
    rollback: (unstagedChanges: string[]) => Promise<void>
    status: () => Promise<
      [string, 0 | 1, 0 | 2 | 1, 0 | 2 | 1 | 3][] | undefined
    >
    getCommittedChanges: () => Promise<string[] | never[]>
    clone: () => Promise<void>
    push: () => Promise<void>
  },
  { loading: boolean; error: string | null }
]

export function useGit(): UseGitReturn {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  if (error) {
    ErrorToast(error)
    setError(null)
  }

  const getUnstagedChanges = useCallback(async () => {
    setLoading(true)
    try {
      return unstagedChanges({ dir: '/' })
    } catch (error) {
      setError(`Git get unstaged changes: ${error.message}`)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  const stageChanges = useCallback(async (unstagedChanges: string[]) => {
    setLoading(true)
    try {
      await gitStageChanges({
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
      const changes = await committedChanges({
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

  const clone = useCallback(async () => {
    try {
      await gitClone({
        url: 'https://github.com/Sound1ab/Notes.git',
        dir: '/',
      })
    } catch (error) {
      setError(`Git clone: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const push = useCallback(async () => {
    try {
      await gitPush({
        dir: '/',
      })
    } catch (error) {
      setError(`Git push: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }, [])

  return [
    {
      getUnstagedChanges,
      stageChanges,
      commit,
      rollback,
      status,
      getCommittedChanges,
      clone,
      push,
    },
    { loading, error },
  ]
}
