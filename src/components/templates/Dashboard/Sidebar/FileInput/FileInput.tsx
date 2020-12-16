import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Input } from '../../../../atoms'

interface IFileInput {
  onClickOutside: () => void
  onSubmit: (name: string) => Promise<void> | void
  startingText?: string
  isDisabled: boolean
}

export function FileInput({
  onClickOutside,
  onSubmit,
  startingText,
  isDisabled,
}: IFileInput) {
  const defaultState = { name: '' }
  const [{ name }, setForm] = useState<{
    [key: string]: string
  }>(defaultState)

  useEffect(() => {
    if (!startingText) {
      return
    }

    setForm((prevState) => ({
      ...prevState,
      name: startingText,
    }))
  }, [startingText])

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setForm((prevState) => ({
      ...prevState,
      name: value,
    }))
  }

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    onClickOutside()

    await onSubmit(name)
  }

  return (
    <Wrapper>
      <StyledFileInput
        isDisabled={isDisabled}
        value={name}
        clickOutsideCallback={onClickOutside}
        handleOnChange={handleOnChange}
        onSubmit={handleSubmit}
        inputAriaLabel="Input file name"
        formAriaLabel="File name form"
        type="text"
        autoFocus
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
  position: relative;

  &:after {
    content: '.md';
    color: var(--text-secondary);
    position: absolute;
    top: 50%;
    right: ${({ theme }) => theme.spacing.s};
    transform: translateY(-50%);
  }
`

const StyledFileInput = styled(Input)`
  padding-right: ${({ theme }) => theme.spacing.ml};
`
