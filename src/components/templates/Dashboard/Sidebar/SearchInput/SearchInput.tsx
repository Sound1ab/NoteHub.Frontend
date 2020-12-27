import React from 'react'
import styled from 'styled-components'

import { useReadSearch } from '../../../../../hooks/localState/useReadSearch'
import { Input } from '../../../../atoms/Input/Input'
import { localState } from '../../../../providers/ApolloProvider/cache'

export function SearchInput() {
  const search = useReadSearch()
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    localState.searchVar(value)
  }

  function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <Wrapper>
      <Input
        value={search}
        clickOutsideCallback={() => null}
        handleOnChange={handleOnChange}
        onSubmit={onSubmit}
        inputAriaLabel="Search files"
        type="text"
        placeholder="Search"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
`
