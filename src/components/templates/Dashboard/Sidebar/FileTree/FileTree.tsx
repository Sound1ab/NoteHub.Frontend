import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useFileTree } from '../../../../../hooks/context/useFileTree'
import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useReadSearch } from '../../../../../hooks/localState/useReadSearch'
import { useFiles } from '../../../../../hooks/recoil/useFiles'
import { createNodes } from '../../../../../utils/createNodes'
import { List } from '../../../../atoms/List/List'
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
  const [files, setFiles] = useFiles()
  const [{ clone }, { loading }] = useGit()
  const [{ listFiles }] = useFs()

  useEffect(() => {
    if (files.length > 0) {
      return
    }

    async function init() {
      await clone?.()

      const files = await listFiles?.()

      setFiles(files)
    }

    init()
  }, [files, clone, setFiles, listFiles])

  if (loading || !files) {
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
