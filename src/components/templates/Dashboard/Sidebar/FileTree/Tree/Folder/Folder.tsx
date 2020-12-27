import React, { MouseEvent, ReactNode } from 'react'
import { useDrop } from 'react-dnd'
import styled, { css } from 'styled-components'

import { useFileTree } from '../../../../../../../hooks/context/useFileTree'
import { useFolderDropdown } from '../../../../../../../hooks/dropdown/useFolderDropdown'
import { IFolderNode, ITreeNode } from '../../../../../../../types'
import { Icon } from '../../../../../../atoms/Icon/Icon'
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
  const {
    onCreate,
    loading,
    onMove,
    onChevronClick,
    onFolderClick,
  } = useFileTree()
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

  async function handleMove({ file }: { file: ITreeNode }) {
    await onMove(file, path, isOver)
  }

  return (
    <>
      <StyledFolder
        node={node}
        level={level}
        dropdownItems={items}
        onClick={() => onFolderClick(node)}
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
            onClick={(e: MouseEvent<HTMLElement>) => onChevronClick(e, node)}
          />
          <StyledIcon size="1x" icon="folder" />
        </>
      </StyledFolder>
      {isNewFileOpen && (
        <FileInput
          onClickOutside={handleSetIsNewFileClose}
          onSubmit={(name) => onCreate(`${path}/${name}.md`)}
          isDisabled={loading}
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
