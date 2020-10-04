import React, { ReactNode, useLayoutEffect, useRef } from 'react'
import FocusLock from 'react-focus-lock'

import { useClickOutside } from '../../../hooks'
import { styled } from '../../../theme'

interface IInlineInput {
  value: string
  clickOutsideCallback: () => void
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
  inputAriaLabel: string
  formAriaLabel?: string
  isDisabled?: boolean
  icon?: ReactNode
  type: 'text' | 'number' | 'submit'
  autocorrect?: 'on' | 'off'
  autocapitalize?: 'on' | 'off'
  autoFocus?: boolean
}

export function InlineInput({
  value,
  clickOutsideCallback,
  handleOnChange,
  onSubmit,
  formAriaLabel,
  inputAriaLabel,
  icon,
  isDisabled,
  type = 'text',
  autocorrect = 'off',
  autocapitalize = 'off',
  autoFocus = false,
  ...rest
}: IInlineInput) {
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  useClickOutside(clickOutsideCallback, wrapperRef)

  return (
    <Form ref={wrapperRef} onSubmit={onSubmit} aria-label={formAriaLabel}>
      {icon}
      <Input
        {...rest}
        ref={inputRef}
        disabled={isDisabled}
        type={type}
        value={value}
        onChange={handleOnChange}
        name="name"
        aria-label={inputAriaLabel}
        autoCorrect={autocorrect}
        autoCapitalize={autocapitalize}
        autoFocus={autoFocus}
      />
      <HiddenSubmit type="submit" />
    </Form>
  )
}

const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
`

const Input = styled.input`
  flex: 1 1 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  min-width: 20px;
  padding: ${({ theme }) => theme.spacing.xxs}
    ${({ theme }) => theme.spacing.xs};
  font-size: 16px; // Note: Has to be 16px to stop ios zoom
  font-weight: ${({ theme }) => theme.typographyStyles.h5.fontWeight};
  border: none;

  &:focus {
    outline: ${({ theme }) => theme.spacing.xxxs} solid
      ${({ theme }) => theme.colors.accent};
  }
`

const HiddenSubmit = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
`
