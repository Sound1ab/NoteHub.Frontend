import React, { useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {
  useCreateFile,
  useFileTree,
  useReadFiles,
  useReadSearch,
} from '../../../../../hooks'
import { createNodes } from '../../../../../utils'
import { ErrorToast, List } from '../../../../atoms'
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
  const search = useReadSearch()
  const { openFoldersInPath } = useFileTree()
  const { files, loading } = useReadFiles()
  const { listOfToggledPaths } = useContext(FileTreeContext)
  const [createFile, { loading: createLoading }] = useCreateFile()

  if (loading) {
    return <TreeSkeleton />
  }

  async function handleCreate(name: string) {
    const path = `${name}.md`

    openFoldersInPath(path)

    try {
      await createFile(path)
    } catch (error) {
      ErrorToast(`There was an issue creating your file`)
    }
  }

  return search ? (
    <SearchResults />
  ) : (
    <>
      <DndProvider backend={HTML5Backend}>
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
      </DndProvider>
    </>
  )
}
