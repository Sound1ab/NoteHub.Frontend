import { useEffect, useState } from 'react'

// import FSWorker from '../../services/worker/loaders/fs'
import { isFile } from '../../utils/isFile'
import { useReadCurrentPath } from '../localState/useReadCurrentPath'

interface IFile {
  path: string
  content: string
}

export function useReadFile() {
  const currentPath = useReadCurrentPath()

  const [file, setFile] = useState<IFile | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // useEffect(() => {
  //   if (!isFile(currentPath)) {
  //     return
  //   }
  //
  //   setLoading(true)

  //   const init = async () => {
  //     try {
  //       const content: string = await FSWorker.readFile({
  //         filepath: `/test-dir/${currentPath}`,
  //       })
  //       console.log('here', content)
  //
  //       setFile({ path: currentPath, content })
  //     } catch (error) {
  //       console.log('here', error)
  //       setError(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   init()
  // }, [currentPath])

  return { file, loading, error }
}
