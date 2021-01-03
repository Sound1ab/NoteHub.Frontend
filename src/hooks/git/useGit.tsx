import React, { useCallback, useState } from 'react'

import { ErrorToast } from '../../components/atoms/Toast/Toast'
import GitWorker from '../../services/worker/loaders/git'

export function useGit() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    ErrorToast(error.message)
    setError(null)
  }

  const getUnstagedChanges = useCallback(async () => {
    setLoading(true)
    try {
      return GitWorker.unstagedChanges({ dir: '/test-dir' })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const stageChanges = useCallback(async (unstagedChanges: string[]) => {
    setLoading(true)
    try {
      await GitWorker.stageChanges({
        dir: '/test-dir',
        unstagedChanges,
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const commit = useCallback(async () => {
    setLoading(true)
    try {
      await GitWorker.commit({
        dir: '/test-dir',
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const rollback = useCallback(async (unstagedChanges: string[]) => {
    setLoading(true)
    try {
      await GitWorker.rollback({
        dir: '/test-dir',
        unstagedChanges,
      })
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const status = useCallback(async () => {
    setLoading(true)
    try {
      const result = await GitWorker.status({
        dir: '/test-dir',
      })
      return result
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const getCommittedChanges = useCallback(async () => {
    setLoading(true)
    try {
      const committedChanges = await GitWorker.committedChanges({
        dir: '/test-dir',
      })

      return committedChanges
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const clone = useCallback(async () => {
    try {
      await GitWorker.clone({
        url: 'https://github.com/Sound1ab/Notes.git',
        dir: '/test-dir',
      })
    } catch (error) {
      setError(error)
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
    },
    { loading },
  ]
}
