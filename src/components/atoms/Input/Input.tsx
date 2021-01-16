import React, { ReactNode, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

import { useClickOutside } from '../../../hooks/utils/useClickOutside'

interface IInlineInput {
  value: string
  clickOutsideCallback?: () => void
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit?: () => void
  inputAriaLabel: string
  formAriaLabel?: string
  icon?: ReactNode
  iconAfter?: ReactNode
  type: 'text' | 'number' | 'submit'
  autocorrect?: 'on' | 'off'
  autocapitalize?: 'on' | 'off'
  autoFocus?: boolean
  placeholder?: string
}

export function Input({
  value,
  clickOutsideCallback,
  handleOnChange,
  onSubmit,
  formAriaLabel,
  inputAriaLabel,
  icon,
  type = 'text',
  autocorrect = 'off',
  autocapitalize = 'off',
  autoFocus,
  iconAfter,
  ...rest
}: IInlineInput) {
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  useClickOutside(clickOutsideCallback, wrapperRef)

  useLayoutEffect(() => {
    if (!autoFocus) {
      return
    }
    inputRef.current?.focus()
  }, [autoFocus])

  return (
    <Form
      ref={wrapperRef}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      aria-label={formAriaLabel}
    >
      {icon}
      <StyledInput
        {...rest}
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleOnChange}
        name="name"
        aria-label={inputAriaLabel}
        autoCorrect={autocorrect}
        autoCapitalize={autocapitalize}
      />
      {iconAfter}
      <HiddenSubmit type="submit" />
    </Form>
  )
}

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
`

const StyledInput = styled.input`
  flex: 1 1 100%;
  background-color: var(--background-tertiary);
  color: var(--text-primary);
  min-width: 20px;
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: 14px; // Note: Has to be 16px to stop ios zoom
  font-weight: ${({ theme }) => theme.typographyStyles.h5.fontWeight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  line-height: 1.1;

  &:focus {
    outline: none;
  }
`

const HiddenSubmit = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
`
