import React, { ReactNode, useState } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

import { useCreateFile, useFileTree } from '../../../../../../../hooks'
import { useMoveFile } from '../../../../../../../hooks/file/useMoveFile'
import { ITreeNode } from '../../../../../../../types'
import { extractFilename } from '../../../../../../../utils'
import { ErrorToast, Icon } from '../../../../../../atoms'
import { FileInput } from '../../../FileInput/FileInput'
import { Node } from '../Node/Node'

interface IFolder {
  node: ITreeNode
  level: number
  childNodes: ReactNode
}

export function Folder({ level, node, childNodes }: IFolder) {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { path, toggled = false } = node
  const [createFile, { loading: loadingCreate }] = useCreateFile()
  const [moveFile, { loading: loadingMove }] = useMoveFile()
  const { activePath, onClick, onToggle, openFoldersInPath } = useFileTree()

  const isActive = path === activePath
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

  function onChevronClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    node: ITreeNode
  ) {
    e.stopPropagation()
    onToggle(node.path, !node.toggled)

    onClick(path)
  }

  function handleSetIsNewFileOpen(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    e.stopPropagation()
    setIsNewFileOpen(true)
    onToggle(node.path, true)
  }

  const dropdownItems = [
    {
      icon: 'edit' as const,
      label: 'Create file',
      onClick: handleSetIsNewFileOpen,
    },
  ]

  function handleOnClick() {
    if (isActive) {
      onToggle(node.path, !node.toggled)
    } else {
      onToggle(node.path, true)
    }

    onClick(path)
  }

  async function handleCreate(name: string) {
    const path = `${node.path}/${name}.md`

    openFoldersInPath(path)

    try {
      await createFile(path)
    } catch (error) {
      ErrorToast(`There was an issue creating your file`)
    }
  }

  async function handleMove({ file }: { file: ITreeNode }) {
    if (!isOver) {
      return
    }

    const name = extractFilename(file.path)

    const newPath = `${path}/${name}`

    // Return if we dropped the file in its original folder
    if (newPath === file.path) {
      return
    }

    openFoldersInPath(newPath)

    try {
      await moveFile(file, newPath)
    } catch {
      ErrorToast('Could not move file')
    }
  }

  return (
    <>
      <StyledFolder
        node={node}
        level={level}
        dropdownItems={dropdownItems}
        onClick={handleOnClick}
        isActive={isActive}
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
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              onChevronClick(e, node)
            }
          />
          <StyledIcon size="1x" icon="folder" />
        </>
      </StyledFolder>
      {isNewFileOpen && (
        <FileInput
          onClickOutside={() => setIsNewFileOpen(false)}
          onSubmit={handleCreate}
          isDisabled={loadingCreate || loadingMove}
        />
      )}
    </>
  )
}

const StyledFolder = styled(Node)<{ isOver: boolean }>`
  background-color: ${({ isOver, theme }) =>
    isOver ? theme.colors.accent : 'transparent'}!important;
`

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Chevron = styled(StyledIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(0.25turn)' : 'rotate(0)')};
`
