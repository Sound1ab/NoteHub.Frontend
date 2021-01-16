import React from 'react'
import styled from 'styled-components'

import { useReadSearch } from '../../../../../hooks/localState/useReadSearch'
import { Input } from '../../../../atoms/Input/Input'
import { localState } from '../../../../providers/ApolloProvider/cache'

export function SearchInput() {
  // TODO: use recoil state
  const search = useReadSearch()
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    localState.searchVar(value)
  }

  return (
    <Wrapper>
      <Input
        value={search}
        clickOutsideCallback={() => null}
        handleOnChange={handleOnChange}
        inputAriaLabel="Search files"
        type="text"
        placeholder="Search"
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.xs};
  border-bottom: 1px solid var(--border-primary);
  height: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
`
