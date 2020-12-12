import React, { MouseEvent, ReactNode, useState } from 'react'

import { CONTAINER_ID } from '../../../../../enums'
import { useCreateFile, useDeleteFile } from '../../../../../hooks'
import { useMoveFile } from '../../../../../hooks/file/useMoveFile'
import { ITreeNode } from '../../../../../types'
import {
  extractFilename,
  removeLastSlug,
  scrollIntoView,
} from '../../../../../utils'
import { Node_Type } from '../../../../apollo'
import { ErrorToast } from '../../../../atoms'
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
  onChevronClick: (e: MouseEvent<HTMLElement>, node: ITreeNode) => void
  onFolderClick: (node: ITreeNode) => void
  onDeleteFile: (node: ITreeNode) => void
  onFileClick: (type: Node_Type, path: string) => void
  onRename: (node: ITreeNode, name: string) => void
}

export const FileTreeContext = React.createContext({} as ContextProps)

export function FileTreeProvider({ children }: IFileTreeProvider) {
  const [listOfToggledPaths, setListOfToggledPaths] = useState<Set<string>>(
    new Set([])
  )
  const [activePath, setActivePath] = useState('')
  const [createFile, { loading: createLoading }] = useCreateFile()
  const [moveFile, { loading: moveLoading }] = useMoveFile()
  const [deleteFile] = useDeleteFile()

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
    } catch (error) {
      ErrorToast(`There was an issue creating your file`)
    }
  }

  function handleChevronClick(e: MouseEvent<HTMLElement>, node: ITreeNode) {
    e.stopPropagation()

    handleOnToggle(node.path, !node.toggled)

    handleOnClick(node.path)
  }

  function handleFolderClick(node: ITreeNode) {
    const isActive = node.path === activePath

    if (isActive) {
      handleOnToggle(node.path, !node.toggled)
    } else {
      handleOnToggle(node.path, true)
    }

    handleOnClick(node.path)
  }

  async function handleMove(file: ITreeNode, path: string, isOver: boolean) {
    if (!isOver) {
      return
    }

    const name = extractFilename(file.path)

    const newPath = `${path}/${name}`

    // Return if we dropped the file in its original folder
    if (newPath === file.path) {
      return
    }

    openFoldersInPath(newPath)

    try {
      await moveFile(file, newPath)
    } catch {
      ErrorToast('Could not move file')
    }
  }

  async function handleDeleteFile(node: ITreeNode) {
    try {
      await deleteFile(node)
    } catch (error) {
      ErrorToast(`There was an issue deleting your file. ${error}`)
    }
  }

  function handleFileClick(type: Node_Type, path: string) {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    handleOnClick(path)

    localState.currentPathVar(path)
  }

  async function handleRename(node: ITreeNode, name: string) {
    const path = removeLastSlug(node.path)

    const newPath = path.length > 0 ? `${path}/${name}.md` : `${name}.md`

    openFoldersInPath(newPath)

    try {
      await moveFile(node, newPath)
    } catch {
      ErrorToast('Could not move file')
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
