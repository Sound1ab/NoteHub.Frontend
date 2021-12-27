import React, { ChangeEvent } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { RenderElementProps } from 'slate-react/dist/components/editable'
import styled from 'styled-components'

import { ChecklistItemElement } from '../../templates/Dashboard/Editor/Slate/SlateTypes'
import { Checkbox } from '../Checkbox/Checkbox'

interface IChecklistItem extends RenderElementProps {
  checked: boolean
}

export function ChecklistItem({
  attributes,
  children,
  checked,
  element,
}: IChecklistItem) {
  const editor = useSlateStatic()

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    const path = ReactEditor.findPath(editor, element)
    const newProperties: Partial<ChecklistItemElement> = {
      checked: event.target.checked,
    }
    Transforms.setNodes(editor, newProperties, { at: path })
  }

  return (
    <Wrapper {...attributes}>
      <CheckboxWrapper contentEditable={false}>
        <Checkbox type="checkbox" checked={checked} onChange={handleOnChange} />
      </CheckboxWrapper>
      <Item isCompleted={checked}>{children}</Item>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};

  p {
    margin-bottom: 0;
  }
`

const CheckboxWrapper = styled.span`
  display: inherit;
`

const Item = styled.span<{ isCompleted: boolean }>`
  text-decoration: ${({ isCompleted }) =>
    isCompleted ? 'line-through' : 'none'};
  text-decoration-color: var(--accent-primary);
  text-decoration-thickness: 2px;
  opacity: ${({ isCompleted }) => (isCompleted ? 0.5 : 1)};
`
