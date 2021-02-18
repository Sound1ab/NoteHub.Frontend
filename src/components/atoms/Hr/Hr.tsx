import React from 'react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

export function Hr({ attributes, children }: Partial<RenderElementProps>) {
  return (
    <SelectFreeZone contentEditable={false} {...attributes}>
      <HorizontalRuleWrapper contentEditable={false}>
        <HorizontalLine />
        {children}
      </HorizontalRuleWrapper>
      <br />
    </SelectFreeZone>
  )
}

const SelectFreeZone = styled.div`
  width: 100%;
  user-select: none;
`

const HorizontalRuleWrapper = styled.div`
  overflow: visible; /* For IE */
  padding: 0;
  border: none;
  text-align: center;
  display: grid;
  user-select: none;
`

const HorizontalLine = styled.div`
  overflow: visible; /* For IE */
  display: grid;
  align-self: center;
  padding: 0;
  height: 1px;
  background-color: var(--accent-primary);
  text-align: center;
  user-select: none;
`
