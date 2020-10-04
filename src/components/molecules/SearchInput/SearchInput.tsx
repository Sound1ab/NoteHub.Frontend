import React from 'react'

import { styled } from '../../../theme'
import { InlineInput } from '../InlineInput/InlineInput'
import { useReadSearch } from '../../../hooks'

export function SearchInput() {
  const { search, client } = useReadSearch()

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    client.writeData({ data: { search: value } })
  }

  const noop = () => null

  return (
    <Wrapper>
      <InlineInput
        value={search}
        clickOutsideCallback={noop}
        handleOnChange={handleOnChange}
        onSubmit={noop}
        inputAriaLabel="Search input"
        type="text"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
`
