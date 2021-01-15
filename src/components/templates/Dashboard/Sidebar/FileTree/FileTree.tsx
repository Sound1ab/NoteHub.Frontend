import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useFileTree } from '../../../../../hooks/fileTree/useFileTree'
import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useReadSearch } from '../../../../../hooks/localState/useReadSearch'
import { useFiles } from '../../../../../hooks/recoil/useFiles'
import { useOpenFolders } from '../../../../../hooks/recoil/useOpenFolders'
import { useRepo } from '../../../../../hooks/recoil/useRepo'
import { createNodes } from '../../../../../utils/createNodes'
import { List } from '../../../../atoms/List/List'
import { ErrorToast } from '../../../../atoms/Toast/Toast'
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
  const [openFolders] = useOpenFolders()
  const [{ createFile }] = useFileTree()
  const [files, setFiles] = useFiles()
  const [repo] = useRepo()
  const [{ clone }, { loading: gitLoading }] = useGit()
  const [{ readDirRecursive }, { loading: fsLoading, error }] = useFs()

  if (error) {
    ErrorToast(error)
  }

  useEffect(() => {
    if (files && files.length > 0) {
      return
    }

    async function init() {
      await clone(repo)

      setFiles(await readDirRecursive())
    }

    init()
  }, [files, clone, setFiles, readDirRecursive, repo])

  if (gitLoading || !files) {
    return <TreeSkeleton />
  }

  async function handleCreate(name: string) {
    const path = `${name}.md`

    await createFile(path)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {search ? (
        <SearchResults />
      ) : (
        <>
          {files &&
            createNodes(files, openFolders).map((node) => (
              <List key={node.name}>
                <Tree key={node.name} node={node} />
              </List>
            ))}
          {isNewFileOpen && (
            <FileInput
              onClickOutside={closeNewFile}
              onSubmit={handleCreate}
              isDisabled={fsLoading}
            />
          )}
        </>
      )}
    </DndProvider>
  )
}
