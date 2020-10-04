import React from 'react'

import { useReadSearch } from '../../../hooks'
import { styled } from '../../../theme'
import { InlineInput } from '../InlineInput/InlineInput'

export function SearchInput() {
  const { search, client } = useReadSearch()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    client.writeData({ data: { search: value } })
  }

  function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <Wrapper>
      <InlineInput
        value={search}
        clickOutsideCallback={() => null}
        handleOnChange={handleOnChange}
        onSubmit={onSubmit}
        inputAriaLabel="Search files"
        type="text"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
`
