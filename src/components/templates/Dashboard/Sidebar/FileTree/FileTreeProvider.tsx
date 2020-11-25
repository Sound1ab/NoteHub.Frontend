import React, { ReactNode, useState } from 'react'

interface IFileTreeProvider {
  children?: ReactNode
}

type ContextProps = {
  onToggle: (path: string, toggled: boolean) => void
  onClick: (path: string) => void
  activePath: string
  listOfToggledPaths: Set<string>
  openFoldersInPath: (path: string) => void
}

export const FileTreeContext = React.createContext({} as ContextProps)

export function FileTreeProvider({ children }: IFileTreeProvider) {
  const [listOfToggledPaths, setListOfToggledPaths] = useState<Set<string>>(
    new Set([])
  )
  const [activePath, setActivePath] = useState('')

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

  return (
    <FileTreeContext.Provider
      value={{
        onToggle: handleOnToggle,
        onClick: handleOnClick,
        activePath,
        listOfToggledPaths,
        openFoldersInPath,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  )
}
