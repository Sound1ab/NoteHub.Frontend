import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import { styled } from '../../../theme'

const Style = styled.input`
  position: relative;
`

interface IInput {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  aria?: string
  disabled?: boolean
}

export const Input = forwardRef(
  ({ value, onChange, name, aria = '', disabled }: IInput, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      ref: inputRef.current,
    }))

    return (
      <Style
        disabled={disabled}
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        aria-label={aria}
      />
    )
  }
)
