import React, { useCallback, useEffect, useRef } from 'react'
import { useSlate } from 'slate-react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

import { useTable } from '../../../../hooks/context/useTable'
import { deleteTableRow } from '../../../templates/Dashboard/Editor/Slate/utils/commands/deleteTableRow'
import { insertTableRow } from '../../../templates/Dashboard/Editor/Slate/utils/commands/insertTableRow'
import { Icon } from '../../Icon/Icon'

export function TBody({ children, attributes, element }: RenderElementProps) {
  const actionBarRef = useRef<HTMLDivElement | null>(null)
  const collapsedTableCellRef = useRef<HTMLTableCellElement | null>(null)
  const plusRef = useRef<HTMLDivElement | null>(null)
  const { tableRef } = useTable()
  const reactEditor = useSlate()

  const setActionBarWidth = useCallback(() => {
    const actionBar = actionBarRef.current
    const collapsedTableCell = collapsedTableCellRef.current
    const table = tableRef?.current
    const plus = plusRef.current

    if (!actionBar || !collapsedTableCell || !table || !plus) return

    actionBar.style.width = `calc(${table.clientWidth}px - ${collapsedTableCell.clientWidth}px)`
    actionBar.style.transform = `translateY(50%) translateX(-100%)`

    plus.style.transform = `translateY(50%) translateX(calc(((${table.clientWidth}px - ${collapsedTableCell.clientWidth}px) / 2) * -1))`
  }, [tableRef])

  useEffect(() => {
    setActionBarWidth()
  }, [setActionBarWidth])

  function handleMouseOver() {
    setActionBarWidth()
  }

  function handlePlusClick() {
    insertTableRow(reactEditor, element)
  }

  function handleTrashClick(e: React.MouseEvent<HTMLDivElement>) {
    // Without this, the event will propagate to slate, which will then
    // try and select the area which we are about to delete
    e.stopPropagation()

    deleteTableRow(reactEditor, element)
  }

  return (
    <StyledTBody {...attributes}>
      <Tr onMouseOver={handleMouseOver}>
        {children}
        <CollapsedTableCell ref={collapsedTableCellRef}>
          <Plus
            icon="plus-circle"
            size="lg"
            wrapperRef={plusRef}
            contentEditable={false}
            onClick={handlePlusClick}
          />
          <ActionBar ref={actionBarRef} />
          <StyledIcon
            size="xs"
            icon="trash"
            isDisabled={false}
            contentEditable={false}
            onClick={handleTrashClick}
          />
        </CollapsedTableCell>
      </Tr>
    </StyledTBody>
  )
}

const Tr = styled.tr`
  position: relative;
`

const CollapsedTableCell = styled.td`
  position: relative;
  width: 0.1%;
  white-space: nowrap;
  border: none;
`

export const StyledTBody = styled.tbody`
  position: relative;
`

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
  width: 1.5em;
  height: 1.5em;
  border-radius: 2px;
  background-color: transparent;
  opacity: 0;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    ${Tr}:hover:not(:disabled) & {
      opacity: 1;
    }

    &:hover {
      background-color: var(--background-tertiary);
    }
  }
`

const Plus = styled(Icon)`
  background-color: var(--text-primary);
  border-radius: 50%;
  position: absolute !important;
  bottom: 0;
  left: 0;
  cursor: pointer;
  opacity: 0;
  z-index: 1;
  width: 0.8em;
  height: 0.8em;

  > * {
    color: var(--background-primary);
  }

  @media (hover: hover) and (pointer: fine) {
    ${Tr}:hover:not(:disabled) & {
      opacity: 1;
    }

    &:hover:not(:disabled) {
      > * {
        color: var(--feedback-info);
      }
    }
  }
`

const ActionBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  cursor: pointer;
  user-select: none;
  background-color: var(--text-primary);
  transform: translateY(50%);
  opacity: 0;

  @media (hover: hover) and (pointer: fine) {
    ${Plus}:hover:not(:disabled) ~ & {
      opacity: 1;
      background-color: var(--feedback-info);
    }
  }
`
