import React from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../../../../enums'
import { useFileDropdown } from '../../../../../../../hooks/dropdown/useFileDropdown'
import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { useFs } from '../../../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../../../hooks/git/useGit'
import { useActivePath } from '../../../../../../../hooks/recoil/useActivePath'
import { useFiles } from '../../../../../../../hooks/recoil/useFiles'
import { useTabs } from '../../../../../../../hooks/recoil/useTabs'
import { ITreeNode } from '../../../../../../../types'
import { removeLastSlug } from '../../../../../../../utils/removeLastSlug'
import { removeMarkdownExtension } from '../../../../../../../utils/removeMarkdownExtension'
import { scrollIntoView } from '../../../../../../../utils/scrollIntoView'
import { Node_Type } from '../../../../../../apollo/generated_components_typings'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { ErrorToast } from '../../../../../../atoms/Toast/Toast'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'
import { useUnstagedChanges } from '../../../../../../../hooks/recoil/useUnstagedChanges'

interface IFile {
  node: ITreeNode
  level: number
}

export function File({ node, level }: IFile) {
  const { items, isRenaming, handleSetIsRenamingClose } = useFileDropdown(node)
  const [{ openFoldersInPath }] = useFileTree()
  const [, setUnstagedChanges] = useUnstagedChanges()
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'NODE', file: node },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const [activePath, setActivePath] = useActivePath()
  const [tabs, setTabs] = useTabs()
  const [{ rename, readDirRecursive }, { loading, error }] = useFs()
  const [{ getUnstagedChanges }] = useGit()
  const [, setFiles] = useFiles()

  const { path, type, name } = node

  if (error) {
    ErrorToast(error)
  }

  async function handleFileClick() {
    if (type === Node_Type.File) {
      scrollIntoView(CONTAINER_ID.EDITOR)
    }

    setActivePath(path)

    setTabs(new Set(tabs.add(path)))
  }

  async function handleRename(value: string) {
    const pathWithoutFilename = removeLastSlug(path)

    const newPath =
      pathWithoutFilename.length > 0
        ? `${pathWithoutFilename.join('/')}/${value}.md`
        : `${value}.md`

    openFoldersInPath?.(newPath)

    await rename(path, newPath)

    setUnstagedChanges(await getUnstagedChanges())

    setFiles(await readDirRecursive())

    setTabs(new Set([...tabs].map((tab) => (tab === path ? newPath : tab))))

    if (path === activePath) {
      setActivePath(newPath)
    }
  }

  return isRenaming ? (
    <FileInput
      onClickOutside={handleSetIsRenamingClose}
      onSubmit={(value) => handleRename(value)}
      startingText={removeMarkdownExtension(name)}
      isDisabled={loading!}
    />
  ) : (
    <StyledFile
      node={node}
      level={level}
      onClick={handleFileClick}
      dropdownItems={items}
      dndRef={dragRef}
      isDragging={isDragging}
    >
      <StyledIcon size="sm" icon="file" />
    </StyledFile>
  )
}

const StyledFile = styled(Node)<{ isDragging: boolean }>`
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
`

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
`
