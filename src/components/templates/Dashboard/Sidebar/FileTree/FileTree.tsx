import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useFileTree, useReadFiles, useReadSearch } from '../../../../../hooks'
import { createNodes } from '../../../../../utils'
import { List } from '../../../../atoms'
import { FileInput } from '../FileInput/FileInput'
import { SearchResults } from './SearchResults/SearchResults'
import { Tree } from './Tree/Tree'
import { TreeSkeleton } from './TreeSkeleton'

interface IFileTree {
  isNewFileOpen: boolean
  closeNewFile: () => void
}

export function FileTree({ isNewFileOpen, closeNewFile }: IFileTree) {
  const search = useReadSearch()
  const { listOfToggledPaths, onCreate, loading: createLoading } = useFileTree()
  const { files, loading: readLoading } = useReadFiles()

  if (readLoading) {
    return <TreeSkeleton />
  }

  async function handleCreate(name: string) {
    const path = `${name}.md`

    await onCreate(path)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {search ? (
        <SearchResults />
      ) : (
        <>
          {files &&
            createNodes(files, listOfToggledPaths).map((node) => (
              <List key={node.name}>
                <Tree key={node.name} node={node} />
              </List>
            ))}
          {isNewFileOpen && (
            <FileInput
              onClickOutside={closeNewFile}
              onSubmit={handleCreate}
              isDisabled={createLoading}
            />
          )}
        </>
      )}
    </DndProvider>
  )
}
