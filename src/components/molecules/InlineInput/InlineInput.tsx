import React, { ReactNode, useLayoutEffect, useRef } from 'react'

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

interface IRepoInput {
  value: string
  clickOutsideCallback: () => void
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void
  inputAriaLabel: string
  formAriaLabel?: string
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
}: IRepoInput) {
  const inputRef = useRef<{ ref: HTMLInputElement } | null>(null)
  const wrapperRef = useRef<HTMLFormElement | null>(null)
  useClickOutside(clickOutsideCallback, wrapperRef)

  useLayoutEffect(() => {
    if (!inputRef.current) {
      return
    }
    inputRef.current.ref.focus()
  }, [])

  return (
    <Style ref={wrapperRef} onSubmit={onSubmit} aria-label={formAriaLabel}>
      {icon}
      <Input
        ref={inputRef}
        value={value}
        onChange={handleOnChange}
        aria={inputAriaLabel}
        name="name"
      />
    </Style>
  )
}
