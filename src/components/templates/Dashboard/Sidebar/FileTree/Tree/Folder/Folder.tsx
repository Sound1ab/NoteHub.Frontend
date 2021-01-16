import React, { ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'

import { useFolderDropdown } from '../../../../../../../hooks/dropdown/useFolderDropdown'
import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { IFolderNode, ITreeNode } from '../../../../../../../types'
import { extractFilename } from '../../../../../../../utils/extractFilename'
import { Icon } from '../../../../../../atoms/Icon/Icon'
import { ErrorToast } from '../../../../../../atoms/Toast/Toast'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFolder {
  node: IFolderNode
  level: number
  childNodes: ReactNode
}

export function Folder({ level, node, childNodes }: IFolder) {
  const { items, isNewFileOpen, handleSetIsNewFileClose } = useFolderDropdown(
    node
  )
  const [
    { renameNode, folderClick, chevronClick, createFile },
    { loading, error },
  ] = useFileTree()
  const { path, toggled = false } = node

  const [{ isOver }, dropRef] = useDrop<
    { type: string; file: ITreeNode },
    Promise<void>,
    { isOver: boolean }
  >({
    accept: 'NODE',
    drop: handleMove,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  })

  if (error) {
    ErrorToast(error)
  }

  async function handleMove({ file }: { file: ITreeNode }) {
    if (!isOver) {
      return
    }

    const filename = extractFilename(file.path)

    const newPath = `${path}/${filename}`

    // Return if we dropped the file in its original folder
    if (newPath === file.path) {
      return
    }

    await renameNode(file.path, newPath)
  }

  function handleFolderClick() {
    folderClick(path, toggled)
  }

  function handleChevronClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()

    chevronClick(path, toggled)
  }

  async function handleCreate(value: string) {
    await createFile(`${path}/${value}.md`)
  }

  return (
    <>
      <StyledFolder
        node={node}
        level={level}
        dropdownItems={items}
        onClick={handleFolderClick}
        childNodes={childNodes}
        dndRef={dropRef}
        isOver={isOver}
      >
        <>
          <Chevron
            toggled={toggled}
            size="1x"
            icon="chevron-right"
            aria-label="chevron"
            onClick={handleChevronClick}
          />
          <StyledIcon size="1x" icon="folder" />
        </>
      </StyledFolder>
      {isNewFileOpen && (
        <FileInput
          onClickOutside={handleSetIsNewFileClose}
          onSubmit={handleCreate}
        />
      )}
    </>
  )
}

const StyledFolder = styled(Node)<{ isOver: boolean }>`
  ${({ isOver }) => {
    return (
      isOver &&
      css`
        background-color: var(--accent-primary) !important;
      `
    )
  }};
`

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
`

const Chevron = styled(StyledIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`
