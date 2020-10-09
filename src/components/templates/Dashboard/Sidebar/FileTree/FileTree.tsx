import React, { useContext } from 'react'

import { useReadNodes, useReadSearch } from '../../../../../hooks'
import { createNodes } from '../../../../../utils'
import { List } from '../../../../atoms'
import { FileInput } from '../FileInput/FileInput'
import { FileTreeContext } from './FileTreeProvider'
import { SearchResults } from './SearchResults/SearchResults'
import { Tree } from './Tree/Tree'
import { TreeSkeleton } from './TreeSkeleton'

interface IFileTree {
  isNewFileOpen: boolean
  closeNewFile: () => void
}

export function FileTree({ isNewFileOpen, closeNewFile }: IFileTree) {
  const { search } = useReadSearch()
  const { gitNodes, loading } = useReadNodes()
  const { listOfToggledPaths } = useContext(FileTreeContext)

  if (loading) {
    return <TreeSkeleton />
  }

  return search ? (
    <SearchResults />
  ) : (
    <>
      {gitNodes &&
        createNodes(gitNodes, listOfToggledPaths).map((node) => (
          <List key={node.name}>
            <Tree key={node.name} node={node} />
          </List>
        ))}
      {isNewFileOpen && (
        <FileInput onClickOutside={closeNewFile} action="create" />
      )}
    </>
  )
}
