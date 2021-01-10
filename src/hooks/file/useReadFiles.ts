import { useEffect, useState } from 'react'

import { IGitTreeNode } from '../../services/git/types'

// import GitWorker from '../../services/worker/loaders/git'

export function useReadFiles() {
  const [files, setFiles] = useState<IGitTreeNode[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // useEffect(() => {
  //   if (files) {
  //     return
  //   }
  //
  //   setLoading(true)

  //   const init = async () => {
  //     try {
  //       await GitWorker.clone({
  //         url: 'https://github.com/Sound1ab/Notes.git',
  //         dir: '/test-dir',
  //       })
  //
  //       setFiles(
  //         await GitWorker.listFiles({ dir: '/test-dir', optimisticPaths: [] })
  //       )
  //     } catch (error) {
  //       setError(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   init()
  // }, [])

  return { files, loading, error }
}
