import { useCallback } from 'react'

import { useOpenFolders } from '../recoil/useOpenFolders'

type UseFileTreeReturn = [
  {
    openFoldersInPath: (path: string) => void
    toggleFolder: (path: string, toggled: boolean) => void
  }
]

export function useFileTree(): UseFileTreeReturn {
  const [, setOpenFolders] = useOpenFolders()

  const toggleFolder = useCallback(
    (path: string, toggled: boolean) => {
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
    },
    [setOpenFolders]
  )

  const openFoldersInPath = useCallback(
    (path: string) => {
      const newPathArray = path.split('/')

      // Pop off the file so that we have the path of the folder
      newPathArray.pop()

      // Toggle all the folders in the path open so we can see the new file
      for (let i = newPathArray.length - 1; i >= 0; i--) {
        toggleFolder(newPathArray.join('/'), true)
        newPathArray.pop()
      }
    },
    [toggleFolder]
  )

  return [
    {
      openFoldersInPath,
      toggleFolder,
    },
  ]
}
