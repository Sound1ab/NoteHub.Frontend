import React from 'react'
import styled from 'styled-components'

interface IRadioItem<T extends string> {
  label: string
  value: T
  checked: boolean
  onChange: (value: T) => void
  title: string
  group: string
}

export function RadioItem<T extends string>({
  label,
  value,
  checked,
  onChange,
  title,
  group,
}: IRadioItem<T>) {
  return (
    <StyledRadioItem title={title}>
      <Radio
        type="radio"
        value={value}
        checked={checked}
        id={value}
        name={group}
        onChange={() => onChange(value)}
      />
      <label htmlFor={value}>{label}</label>
    </StyledRadioItem>
  )
}

const StyledRadioItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Radio = styled.input`
  width: 1.15em;
  height: 1.15em;
  margin-right: ${({ theme }) => theme.spacing.xs};
`
