import React from 'react'
import styled from 'styled-components'

interface ICheckboxItem {
  label: string
  name: string
  checked: boolean
  onChange: (name: string) => void
  title?: string
}

export function CheckboxItem({
  label,
  name,
  checked,
  onChange,
  title,
}: ICheckboxItem) {
  function handleClick() {
    onChange(name)
  }

  return (
    <StyledCheckboxItem onClick={handleClick} title={title}>
      <Checkbox
        type="checkbox"
        name={name}
        checked={checked}
        title={`${name} checkbox`}
        readOnly={true}
      />
      {label}
    </StyledCheckboxItem>
  )
}

const StyledCheckboxItem = styled.div`
  position: relative;
`

const Checkbox = styled.input`
  width: 1.15em;
  height: 1.15em;
  margin-right: ${({ theme }) => theme.spacing.xs};
`
