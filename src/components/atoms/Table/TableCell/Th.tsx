import React, { useCallback, useEffect, useRef } from 'react'
import { useSlate } from 'slate-react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

import { useTable } from '../../../../hooks/context/useTable'
import { insertTableColumn } from '../../../templates/Dashboard/Editor/Slate/utils/commands/insertTableColumn'
import { Icon } from '../../Icon/Icon'

interface ITh extends RenderElementProps {
  header?: boolean
}

export function Th({ attributes, children, element }: ITh) {
  const actionBarRef = useRef<HTMLDivElement | null>(null)
  const { tableRef } = useTable()
  const reactEditor = useSlate()

  const setActionBarHeight = useCallback(() => {
    const actionBar = actionBarRef.current
    const table = tableRef?.current

    if (!actionBar || !table) return

    actionBar.style.height = `${table.clientHeight}px`
  }, [tableRef])

  useEffect(() => {
    setActionBarHeight()
  }, [setActionBarHeight])

  function handleMouseOver() {
    setActionBarHeight()
  }

  function handleActionClick() {
    console.log('here')
  }

  function handlePlusClick() {
    insertTableColumn(reactEditor, element)
  }

  return (
    <StyledTh {...attributes} onMouseOver={handleMouseOver}>
      <ActionButtonWrapper contentEditable={false} onClick={handleActionClick}>
        <ActionButton size="xs" icon="ellipsis-h" isDisabled={false} />
      </ActionButtonWrapper>
      <Plus
        icon="plus-circle"
        size="lg"
        contentEditable={false}
        onClick={handlePlusClick}
      />
      <ActionBar ref={actionBarRef} contentEditable={false} />
      {children}
    </StyledTh>
  )
}

const StyledTh = styled.th`
  position: relative;
`

const Plus = styled(Icon)`
  background-color: var(--text-primary);
  border-radius: 50%;
  position: absolute !important;
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-50%);
  cursor: pointer;
  opacity: 0;
  z-index: 1;
  width: 0.8em;
  height: 0.8em;

  > * {
    color: var(--background-primary);
  }

  @media (hover: hover) and (pointer: fine) {
    ${StyledTh}:hover:not(:disabled) & {
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
  top: 0;
  left: 0;
  width: 2px;
  cursor: pointer;
  user-select: none;
  transform: translateX(-50%);
  background-color: var(--text-primary);
  opacity: 0;

  @media (hover: hover) and (pointer: fine) {
    ${Plus}:hover:not(:disabled) ~ & {
      opacity: 1;
      background-color: var(--feedback-info);
    }
  }
`

const ActionButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  border-radius: 2px;
  opacity: 0;
  cursor: pointer;
  transform: translateY(-100%);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--background-tertiary);
    }

    ${StyledTh}:hover:not(:disabled) & {
      opacity: 1;
    }
  }
`

const ActionButton = styled(Icon)`
  color: var(--text-primary);
`
