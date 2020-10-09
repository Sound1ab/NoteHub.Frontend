import React, { useState } from 'react'

import { useReadNodes, useReadSearch } from '../../../../../hooks'
import { createNodes } from '../../../../../utils'
import { List } from '../../../../atoms'
import { FileInput } from '../FileInput/FileInput'
import { SearchResults } from './SearchResults'
import { Tree } from './Tree'
import { TreeSkeleton } from './TreeSkeleton'

interface IFileTree {
  isNewFileOpen: boolean
  closeNewFile: () => void
}

export function FileTree({ isNewFileOpen, closeNewFile }: IFileTree) {
  const { search } = useReadSearch()
  const { gitNodes, loading } = useReadNodes()
  const [listOfToggledPaths, setListOfToggledPaths] = useState<Set<string>>(
    new Set([])
  )
  const [activePath, setActivePath] = useState('')

  if (loading) {
    return <TreeSkeleton />
  }

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

  return search ? (
    <SearchResults onClick={handleOnClick} activePath={activePath} />
  ) : (
    <>
      {gitNodes &&
        createNodes(gitNodes, listOfToggledPaths).map((node) => (
          <List key={node.name}>
            <Tree
              key={node.name}
              node={node}
              onToggle={handleOnToggle}
              onClick={handleOnClick}
              activePath={activePath}
            />
          </List>
        ))}
      {isNewFileOpen && (
        <FileInput
          onClickOutside={closeNewFile}
          onToggle={handleOnToggle}
          action="create"
        />
      )}
    </>
  )
}
