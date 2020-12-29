import React, { MouseEvent, ReactNode, useState } from 'react'

import { CONTAINER_ID } from '../../../../../enums'
import { useCreateFile } from '../../../../../hooks/file/useCreateFile'
import { useDeleteFile } from '../../../../../hooks/file/useDeleteFile'
import { useMoveFile } from '../../../../../hooks/file/useMoveFile'
import { useReadCurrentPath } from '../../../../../hooks/localState/useReadCurrentPath'
import { useReadTabs } from '../../../../../hooks/localState/useReadTabs'
import { IFolderNode, ITreeNode } from '../../../../../types'
import { extractFilename } from '../../../../../utils/extractFilename'
import { getNextTab } from '../../../../../utils/getNextTab'
import { removeLastSlug } from '../../../../../utils/removeLastSlug'
import { scrollIntoView } from '../../../../../utils/scrollIntoView'
import { Node_Type } from '../../../../apollo/generated_components_typings'
import { ErrorToast } from '../../../../atoms/Toast/Toast'
import { localState } from '../../../../providers/ApolloProvider/cache'

interface IFileTreeProvider {
  children?: ReactNode
}

type ContextProps = {
  onToggle: (path: string, toggled: boolean) => void
  onClick: (path: string) => void
  activePath: string
  listOfToggledPaths: Set<string>
  openFoldersInPath: (path: string) => void
  loading: boolean
  onCreate: (path: string) => void
  onMove: (file: ITreeNode, path: string, isOver: boolean) => void
  onChevronClick: (e: MouseEvent<HTMLElement>, node: IFolderNode) => void
  onFolderClick: (node: IFolderNode) => void
  onDeleteFile: (node: ITreeNode) => void
  onFileClick: (type: Node_Type, path: string) => void
  onRename: (node: ITreeNode, name: string) => void
}

export const FileTreeContext = React.createContext({} as ContextProps)

export function FileTreeProvider({ children }: IFileTreeProvider) {
  const [listOfToggledPaths, setListOfToggledPaths] = useState<Set<string>>(
    new Set([])
  )
  const currentPath = useReadCurrentPath()
  const [activePath, setActivePath] = useState('')
  const [createFile, { loading: createLoading }] = useCreateFile()
  const [moveFile, { loading: moveLoading }] = useMoveFile()
  const [deleteFile] = useDeleteFile()
  const tabs = useReadTabs()

  function handleOnToggle(path: string, toggled: boolean) {
    if (toggled) {
      listOfToggledPaths.add(path)
    } else {
      listOfToggledPaths.delete(path)
    }
    setListOfToggledPaths(new Set(listOfToggledPaths))
  }

  function handleOnClick(path: string) {
    setActivePath(path)
  }

  function openFoldersInPath(path: string) {
    const newPathArray = path.split('/')

    // Pop off the file so that we have the path of the folder
    newPathArray.pop()

    // Toggle all the folders in the path open so we can see the new file
    for (let i = newPathArray.length - 1; i >= 0; i--) {
      handleOnToggle(newPathArray.join('/'), true)
      newPathArray.pop()
    }
  }

  async function handleCreate(path: string) {
    openFoldersInPath(path)

    try {
      await createFile(path)

      tabs.add(path)

      localState.tabsVar(new Set(tabs))

      localState.currentPathVar(path)

      setActivePath(path)
    } catch (error) {
      ErrorToast(`There was an issue creating your file`)
    }
  }

  function handleChevronClick(e: MouseEvent<HTMLElement>, node: IFolderNode) {
    e.stopPropagation()

    handleOnToggle(node.path, !node.toggled)

    handleOnClick(node.path)
  }

  function handleFolderClick(node: IFolderNode) {
    const isActive = node.path === activePath

    if (isActive) {
      handleOnToggle(node.path, !node.toggled)
    } else {
      handleOnToggle(node.path, true)
    }

    handleOnClick(node.path)
  }

  async function handleMove(node: ITreeNode, path: string, isOver: boolean) {
    if (!isOver) {
      return
    }

    const name = extractFilename(node.path)

    const newPath = `${path}/${name}`

    // Return if we dropped the file in its original folder
    if (newPath === node.path) {
      return
    }

    openFoldersInPath(newPath)

    const restoreTabs = [...tabs]
    const restorePath = node.path

    try {
      localState.tabsVar(
        new Set([...tabs].map((tab) => (tab === node.path ? newPath : tab)))
      )

      await moveFile(node, newPath)

      setActivePath(newPath)

      if (node.path === currentPath) {
        localState.currentPathVar(newPath)
      }
    } catch {
      localState.tabsVar(new Set(restoreTabs))

      if (restorePath === currentPath) {
        localState.currentPathVar(restorePath)
      }

      setActivePath(restorePath)
      ErrorToast('Could not move file')
    }
  }

  async function handleDeleteFile(node: ITreeNode) {
    try {
      // If the file deleted is active, update the active file based on
      // the open tabs
      if (node.path === currentPath) {
        const nextTab = getNextTab([...tabs], node.path)

        if (!nextTab) {
          localState.currentPathVar('')
        } else {
          localState.currentPathVar(nextTab)
        }
      }

      await deleteFile(node)
    } catch (error) {
      localState.currentPathVar(node.path)

      ErrorToast(`There was an issue deleting your file. ${error}`)
    }
  }

  function handleFileClick(type: Node_Type, path: string) {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    handleOnClick(path)

    localState.currentPathVar(path)

    tabs.add(path)

    localState.tabsVar(new Set(tabs))
  }

  async function handleRename(node: ITreeNode, name: string) {
    const path = removeLastSlug(node.path)

    const newPath = path.length > 0 ? `${path}/${name}.md` : `${name}.md`

    openFoldersInPath(newPath)

    const restoreTabs = [...tabs]
    const restorePath = node.path

    try {
      localState.tabsVar(
        new Set([...tabs].map((tab) => (tab === node.path ? newPath : tab)))
      )

      await moveFile(node, newPath)

      setActivePath(newPath)

      if (node.path === currentPath) {
        localState.currentPathVar(newPath)
      }
    } catch {
      localState.tabsVar(new Set(restoreTabs))

      if (restorePath === currentPath) {
        localState.currentPathVar(restorePath)
      }

      setActivePath(restorePath)

      ErrorToast('Could not rename file')
    }
  }

  return (
    <FileTreeContext.Provider
      value={{
        onToggle: handleOnToggle,
        onClick: handleOnClick,
        activePath,
        listOfToggledPaths,
        openFoldersInPath,
        loading: createLoading || moveLoading,
        onCreate: handleCreate,
        onMove: handleMove,
        onChevronClick: handleChevronClick,
        onFolderClick: handleFolderClick,
        onDeleteFile: handleDeleteFile,
        onFileClick: handleFileClick,
        onRename: handleRename,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  )
}
