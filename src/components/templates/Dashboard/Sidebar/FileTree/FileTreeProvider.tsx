import React, { ReactNode, useState } from 'react'

interface IFileTreeProvider {
  children?: ReactNode
}

type ContextProps = {
  onToggle: (path: string, toggled: boolean) => void
  onClick: (path: string) => void
  activePath: string
  listOfToggledPaths: Set<string>
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

  return (
    <FileTreeContext.Provider
      value={{
        onToggle: handleOnToggle,
        onClick: handleOnClick,
        activePath,
        listOfToggledPaths,
      }}
    >
      {children}
    </FileTreeContext.Provider>
  )
}
