import React, { ReactNode, useRef } from 'react'
import FocusLock from 'react-focus-lock'

import { useClickOutside } from '../../../hooks'
import { styled } from '../../../theme'
import { Input } from '../../atoms'

const Style = styled.form`
  position: relative;
  display: flex;
  width: 100%;

  input {
    flex: 1;
    font-size: ${({ theme }) => theme.rhythm(0.6)};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    min-width: 20px;
    padding: 0 ${({ theme }) => theme.spacing.xxs};
  }
`

interface IInlineInput {
  value: string
  clickOutsideCallback: () => void
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
  inputAriaLabel: string
  formAriaLabel?: string
  isDisabled?: boolean
  icon?: ReactNode
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
}: IInlineInput) {
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  useClickOutside(clickOutsideCallback, wrapperRef)

  return (
    <Style ref={wrapperRef} onSubmit={onSubmit} aria-label={formAriaLabel}>
      {icon}
      <FocusLock>
        <Input
          disabled={isDisabled}
          value={value}
          onChange={handleOnChange}
          aria={inputAriaLabel}
          name="name"
        />
      </FocusLock>
    </Style>
  )
}
