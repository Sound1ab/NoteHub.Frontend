import { useCallback } from 'react'

import { CONTAINER_ID } from '../../enums'
import { getNextTab } from '../../utils/getNextTab'
import { scrollIntoView } from '../../utils/scrollIntoView'
import { useFs } from '../fs/useFs'
import { useGit } from '../git/useGit'
import { useActivePath } from '../recoil/useActivePath'
import { useFiles } from '../recoil/useFiles'
import { useFileTreePath } from '../recoil/useFileTreePath'
import { useOpenFolders } from '../recoil/useOpenFolders'
import { useTabs } from '../recoil/useTabs'

export function useFileTree() {
  const [activePath, setActivePath] = useActivePath()
  const [fileTreePath, setFileTreePath] = useFileTreePath()
  const [, setFiles] = useFiles()
  const [, setOpenFolders] = useOpenFolders()
  const [tabs, setTabs] = useTabs()
  const { unlink, readDirRecursive, rename, writeFile } = useFs()
  const { commit, push, add, remove } = useGit()

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
      // Delete a file from FS. File is removed from the tree and not yet staged
      await unlink(path)

      // Stage the deleted file
      await remove(path)

      await commit()

      await push()

      setFiles(await readDirRecursive())

      setTabs((tabs) => new Set([...tabs].filter((tab) => tab !== path)))

      const nextTab = getNextTab([...tabs], path)
      // If the file deleted is active, update the active file based on
      // the open tabs
      if (path === activePath) {
        if (!nextTab) {
          setActivePath('')
        } else {
          setActivePath(nextTab)
        }
      }

      if (path === fileTreePath) {
        if (!nextTab) {
          setFileTreePath('')
        } else {
          setFileTreePath(nextTab)
        }
      }
    },
    [
      remove,
      push,
      commit,
      unlink,
      setFiles,
      setActivePath,
      setFileTreePath,
      activePath,
      fileTreePath,
      readDirRecursive,
      setTabs,
      tabs,
    ]
  )

  const renameNode = useCallback(
    async (oldPath: string, newPath: string) => {
      openFoldersInPath(newPath)

      await rename(oldPath, newPath)

      await remove(oldPath)

      await add(newPath)

      await commit()

      await push()

      setFiles(await readDirRecursive())

      setTabs(
        (tabs) =>
          new Set([...tabs].map((tab) => (tab === oldPath ? newPath : tab)))
      )

      if (oldPath === activePath) {
        setActivePath(newPath)
      }
      if (oldPath === fileTreePath) {
        setFileTreePath(newPath)
      }
    },
    [
      remove,
      add,
      commit,
      push,
      openFoldersInPath,
      rename,
      setFiles,
      setActivePath,
      setFileTreePath,
      activePath,
      fileTreePath,
      readDirRecursive,
      setTabs,
    ]
  )

  const createFile = useCallback(
    async (path: string) => {
      openFoldersInPath(path)

      await writeFile(path, '')

      await add(path)

      await commit()

      await push()

      setFiles(await readDirRecursive())

      setTabs((tabs) => new Set([...tabs.add(path)]))

      setActivePath(path)
      setFileTreePath(path)
    },
    [
      add,
      commit,
      push,
      openFoldersInPath,
      setFiles,
      setActivePath,
      setFileTreePath,
      readDirRecursive,
      setTabs,
      writeFile,
    ]
  )

  const fileClick = useCallback(
    (path: string) => {
      scrollIntoView(CONTAINER_ID.EDITOR)

      setActivePath(path)
      setFileTreePath(path)

      setTabs((tabs) => new Set(tabs.add(path)))
    },
    [setActivePath, setTabs, setFileTreePath]
  )

  const folderClick = useCallback(
    (path: string, toggled: boolean) => {
      const isActive = path === fileTreePath

      if (isActive) {
        toggleFolder(path, !toggled)
      } else {
        toggleFolder(path, true)
      }

      setFileTreePath(path)
    },
    [fileTreePath, toggleFolder, setFileTreePath]
  )

  const chevronClick = useCallback(
    (path: string, toggled: boolean) => {
      toggleFolder(path, !toggled)

      setFileTreePath(path)
    },
    [toggleFolder, setFileTreePath]
  )

  return {
    actions: {
      openFoldersInPath,
      toggleFolder,
      deleteFile,
      renameNode,
      fileClick,
      createFile,
      folderClick,
      chevronClick,
    },
  }
}
