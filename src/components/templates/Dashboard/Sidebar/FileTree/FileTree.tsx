import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useFileTree } from '../../../../../hooks/fileTree/useFileTree'
import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useFiles } from '../../../../../hooks/recoil/useFiles'
import { useOpenFolders } from '../../../../../hooks/recoil/useOpenFolders'
import { useRepo } from '../../../../../hooks/recoil/useRepo'
import { useSearch } from '../../../../../hooks/recoil/useSearch'
import useDeepCompareEffect from '../../../../../hooks/utils/useDeepCompareEffect'
import { useLoading } from '../../../../../hooks/utils/useLoading'
import { createNodes } from '../../../../../utils/createNodes'
import { extractFilename } from '../../../../../utils/extractFilename'
import { Fade } from '../../../../animation/Mount/Fade'
import { Node_Type } from '../../../../apollo/generated_components_typings'
import { SearchResults } from '../../../../atoms/SearchResults/SearchResults'
import { UnstyledList } from '../../../../atoms/UnstyledList/UnstyledList'
import { FileInput } from '../FileInput/FileInput'
import { File } from './Tree/File/File'
import { Tree } from './Tree/Tree'
import { TreeSkeleton } from './TreeSkeleton'

interface IFileTree {
  isNewFileOpen: boolean
  closeNewFile: () => void
}

export function FileTree({ isNewFileOpen, closeNewFile }: IFileTree) {
  const [search] = useSearch()
  const [openFolders] = useOpenFolders()
  const {
    actions: { createFile },
  } = useFileTree()
  const { files, loading } = useCloneConnectedRepo()

  async function handleCreate(name: string) {
    const path = `${name}.md`

    await createFile(path)
  }

  const searchFiles = files
    .filter(({ type }: { type: Node_Type }) => type === Node_Type.File)
    .map(({ type, path }: { type: Node_Type; path: string }) => {
      const slug = extractFilename(path)

      return {
        slug,
        path,
        type,
      }
    })

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <Fade show={loading}>
          <TreeSkeleton />
        </Fade>
        <Fade show={!loading}>
          {search ? (
            <UnstyledList>
              <SearchResults<{ type: Node_Type; path: string; slug: string }>
                search={search}
                data={searchFiles}
                keys={['slug']}
              >
                {(results) =>
                  results.map(({ item: { path, type, slug } }) => (
                    <File
                      key={path}
                      node={{
                        id: path,
                        name: slug,
                        type,
                        path,
                        isOptimistic: false,
                      }}
                      level={-1}
                    />
                  ))
                }
              </SearchResults>
            </UnstyledList>
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

function useCloneConnectedRepo() {
  const [files, setFiles] = useFiles()
  const [repo] = useRepo()
  const { clone } = useGit()
  const { readDirRecursive } = useFs()
  const { loading, withLoading } = useLoading()

  useDeepCompareEffect(() => {
    if (!repo) return

    const init = withLoading(async () => {
      await clone(repo)

      setFiles(await readDirRecursive())
    })

    init()
  }, [clone, setFiles, readDirRecursive, repo])

  return {
    files,
    loading,
  }
}
