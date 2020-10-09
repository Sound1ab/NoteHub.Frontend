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

  if (loading) {
    return <TreeSkeleton />
  }

  function onToggle(path: string, toggled: boolean) {
    if (toggled) {
      listOfToggledPaths.add(path)
    } else {
      listOfToggledPaths.delete(path)
    }
    setListOfToggledPaths(new Set(listOfToggledPaths))
  }

  return search ? (
    <SearchResults />
  ) : (
    <>
      {gitNodes &&
        createNodes(gitNodes, listOfToggledPaths).map((node) => (
          <List key={node.name}>
            <Tree key={node.name} node={node} onToggle={onToggle} />
          </List>
        ))}
      {isNewFileOpen && (
        <FileInput
          onClickOutside={closeNewFile}
          onToggle={onToggle}
          action="create"
        />
      )}
    </>
  )
}
