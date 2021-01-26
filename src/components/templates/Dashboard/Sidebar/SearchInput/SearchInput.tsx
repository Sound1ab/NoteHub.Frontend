import React from 'react'
import styled from 'styled-components'

import { useSearch } from '../../../../../hooks/recoil/useSearch'
import { Input } from '../../../../atoms/Input/Input'

export function SearchInput() {
  const [search, setSearch] = useSearch()
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setSearch(value)
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
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
`
