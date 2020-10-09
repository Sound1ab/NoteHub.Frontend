import React from 'react'

import { styled } from '../../../../../theme'
import { Input } from '../../../../atoms'
import { searchVar } from '../../../../providers/ApolloProvider/cache'
import { useReactiveVar } from '@apollo/client'

export function SearchInput() {
  const search = useReactiveVar(searchVar)
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    searchVar(value)
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
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xs};
`
