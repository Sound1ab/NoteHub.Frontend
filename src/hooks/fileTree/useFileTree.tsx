import { useCallback } from 'react'

import { CONTAINER_ID } from '../../enums'
import { getNextTab } from '../../utils/getNextTab'
import { scrollIntoView } from '../../utils/scrollIntoView'
import { useFs } from '../fs/useFs'
import { useGit } from '../git/useGit'
import { useActivePath } from '../recoil/useActivePath'
import { useFiles } from '../recoil/useFiles'
import { useOpenFolders } from '../recoil/useOpenFolders'
import { useTabs } from '../recoil/useTabs'
import { useUnstagedChanges } from '../recoil/useUnstagedChanges'

type UseFileTreeReturn = [
  {
    openFoldersInPath: (path: string) => void
    toggleFolder: (path: string, toggled: boolean) => void
    deleteFile: (path: string) => Promise<void>
    renameNode: (oldPath: string, newPath: string) => Promise<void>
    fileClick: (path: string) => void
    createFile: (path: string) => void
    folderClick: (path: string, toggled: boolean) => void
    chevronClick: (path: string, toggled: boolean) => void
  },
  { loading: boolean; error: string | null }
]

export function useFileTree(): UseFileTreeReturn {
  const [activePath, setActivePath] = useActivePath()
  const [, setFiles] = useFiles()
  const [, setOpenFolders] = useOpenFolders()
  const [tabs, setTabs] = useTabs()
  const [, setUnstagedChanges] = useUnstagedChanges()

  const [
    { unlink, readDirRecursive, rename, writeFile },
    { loading: fsLoading, error: fsError },
  ] = useFs()
  const [
    { remove, getUnstagedChanges },
    { loading: gitLoading, error: gitError },
  ] = useGit()

  const toggleFolder = useCallback(
    (path: string, toggled: boolean) => {
      if (toggled) {
        setOpenFolders((openFolders) => new Set([...openFolders.add(path)]))
      } else {
        setOpenFolders((openFolders) => {
          openFolders.delete(path)
          return new Set([...openFolders])
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

  const deleteFile = useCallback(
    async (path: string) => {
      await unlink(path)

      // await remove(path)

      setUnstagedChanges(await getUnstagedChanges())

      setFiles(await readDirRecursive())

      setTabs((tabs) => new Set([...tabs].filter((tab) => tab !== path)))

      // If the file deleted is active, update the active file based on
      // the open tabs
      if (path === activePath) {
        const nextTab = getNextTab([...tabs], path)

        if (!nextTab) {
          setActivePath('')
        } else {
          setActivePath(nextTab)
        }
      }
    },
    [
      unlink,
      setUnstagedChanges,
      getUnstagedChanges,
      setFiles,
      setActivePath,
      activePath,
      readDirRecursive,
      setTabs,
      tabs,
    ]
  )

  const renameNode = useCallback(
    async (oldPath: string, newPath: string) => {
      openFoldersInPath?.(newPath)

      await rename(oldPath, newPath)

      setUnstagedChanges(await getUnstagedChanges())

      setFiles(await readDirRecursive())

      setTabs(
        (tabs) =>
          new Set([...tabs].map((tab) => (tab === oldPath ? newPath : tab)))
      )

      if (oldPath === activePath) {
        setActivePath(newPath)
      }
    },
    [
      openFoldersInPath,
      remove,
      rename,
      setUnstagedChanges,
      getUnstagedChanges,
      setFiles,
      setActivePath,
      activePath,
      readDirRecursive,
      setTabs,
    ]
  )

  const createFile = useCallback(
    async (path: string) => {
      openFoldersInPath(path)

      await writeFile(path, '')

      setUnstagedChanges(await getUnstagedChanges())

      setFiles(await readDirRecursive())

      setTabs((tabs) => new Set([...tabs.add(path)]))

      setActivePath(path)
    },
    [
      openFoldersInPath,
      setUnstagedChanges,
      getUnstagedChanges,
      setFiles,
      setActivePath,
      readDirRecursive,
      setTabs,
      writeFile,
    ]
  )

  const fileClick = useCallback(
    (path: string) => {
      scrollIntoView(CONTAINER_ID.EDITOR)

      setActivePath(path)

      setTabs((tabs) => new Set(tabs.add(path)))
    },
    [setActivePath, setTabs]
  )

  const folderClick = useCallback(
    async (path: string, toggled: boolean) => {
      const isActive = path === activePath

      if (isActive) {
        toggleFolder(path, !toggled)
      } else {
        toggleFolder(path, true)
      }

      setActivePath(path)
    },
    [activePath, toggleFolder, setActivePath]
  )

  const chevronClick = useCallback(
    async (path: string, toggled: boolean) => {
      toggleFolder(path, !toggled)

      setActivePath(path)
    },
    [toggleFolder, setActivePath]
  )

  return [
    {
      openFoldersInPath,
      toggleFolder,
      deleteFile,
      renameNode,
      fileClick,
      createFile,
      folderClick,
      chevronClick,
    },
    { loading: fsLoading || gitLoading, error: fsError || gitError },
  ]
}
