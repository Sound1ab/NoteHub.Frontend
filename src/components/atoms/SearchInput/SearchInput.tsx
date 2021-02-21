import React from 'react'
import { SetterOrUpdater } from 'recoil'

import { Input } from '../Input/Input'

interface ISearchInput {
  search: string
  setSearch: SetterOrUpdater<string>
  className?: string
}

export function SearchInput({ search, setSearch, className }: ISearchInput) {
  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    setSearch(value)
  }

  return (
    <Input
      value={search}
      clickOutsideCallback={() => null}
      handleOnChange={handleOnChange}
      inputAriaLabel="Search files"
      type="text"
      placeholder="Search"
      className={className}
    />
  )
}
