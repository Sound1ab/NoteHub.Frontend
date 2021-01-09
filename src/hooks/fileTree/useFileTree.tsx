import { useCallback, useState } from 'react'

export function useFileTree() {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set([]))
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const openFolder = useCallback((path: string, toggled: boolean) => {
    if (toggled) {
      setOpenFolders((openFolders) => {
        openFolders.add(path)
        return new Set(openFolders)
      })
    } else {
      setOpenFolders((openFolders) => {
        openFolders.delete(path)
        return new Set(openFolders)
      })
    }
  }, [])

  const openFoldersInPath = useCallback(
    (path: string) => {
      const newPathArray = path.split('/')

      // Pop off the file so that we have the path of the folder
      newPathArray.pop()

      // Toggle all the folders in the path open so we can see the new file
      for (let i = newPathArray.length - 1; i >= 0; i--) {
        openFolder(newPathArray.join('/'), true)
        newPathArray.pop()
      }
    },
    [openFolder]
  )

  return [
    {
      openFoldersInPath,
      openFolder,
    },
    {
      openFolders,
    },
  ]
}
