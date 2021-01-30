import React, { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useFileTree } from '../../../../../hooks/fileTree/useFileTree'
import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useFiles } from '../../../../../hooks/recoil/useFiles'
import { useOpenFolders } from '../../../../../hooks/recoil/useOpenFolders'
import { useRepo } from '../../../../../hooks/recoil/useRepo'
import { useSearch } from '../../../../../hooks/recoil/useSearch'
import { createNodes } from '../../../../../utils/createNodes'
import { Fade } from '../../../../animation/Mount/Fade'
import { UnstyledList } from '../../../../atoms/UnstyledList/UnstyledList'
import { FileInput } from '../FileInput/FileInput'
import { SearchResults } from './SearchResults/SearchResults'
import { Tree } from './Tree/Tree'
import { TreeSkeleton } from './TreeSkeleton'

interface IFileTree {
  isNewFileOpen: boolean
  closeNewFile: () => void
}

export function FileTree({ isNewFileOpen, closeNewFile }: IFileTree) {
  const [search] = useSearch()
  const [openFolders] = useOpenFolders()
  const [{ createFile }] = useFileTree()
  const [files, setFiles] = useFiles()
  const [repo] = useRepo()
  const [{ clone }] = useGit()
  const [{ readDirRecursive }] = useFs()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (files && files.length > 0) {
      return
    }
    setLoading(true)

    async function init() {
      await clone(repo)

      setFiles(await readDirRecursive())
      setLoading(false)
    }

    init()
  }, [files, clone, setFiles, readDirRecursive, repo])

  async function handleCreate(name: string) {
    const path = `${name}.md`

    await createFile(path)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Fade show={loading}>
          <TreeSkeleton />
        </Fade>
        <Fade show={!loading}>
          {search ? (
            <SearchResults />
          ) : (
            <>
              {files &&
                createNodes(files, openFolders).map((node) => (
                  <UnstyledList key={node.name}>
                    <Tree key={node.name} node={node} />
                  </UnstyledList>
                ))}
              {isNewFileOpen && (
                <FileInput
                  onClickOutside={closeNewFile}
                  onSubmit={handleCreate}
                />
              )}
            </>
          )}
        </Fade>
      </>
    </DndProvider>
  )
}
