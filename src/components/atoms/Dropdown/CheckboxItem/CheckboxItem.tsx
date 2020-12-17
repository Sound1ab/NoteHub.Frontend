import React from 'react'
import styled from 'styled-components'

interface ICheckboxItem<T extends string> {
  label: string
  value: T
  checked: boolean
  onChange: (value: T) => void
  title?: string
}

export function CheckboxItem<T extends string>({
  label,
  value,
  checked,
  onChange,
  title,
}: ICheckboxItem<T>) {
  function handleClick() {
    onChange(value)
  }

  return (
    <StyledCheckboxItem onClick={handleClick} title={title}>
      <Checkbox
        type="checkbox"
        name={value}
        checked={checked}
        readOnly={true}
        id={value}
      />
      <label htmlFor={value}>{label}</label>
    </StyledCheckboxItem>
  )
}

const StyledCheckboxItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Checkbox = styled.input`
  width: 1.15em;
  height: 1.15em;
  margin-right: ${({ theme }) => theme.spacing.xs};
`
