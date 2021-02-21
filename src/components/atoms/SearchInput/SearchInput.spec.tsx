import userEvent from '@testing-library/user-event'
import React from 'react'

import * as useSearch from '../../../hooks/recoil/useSearch'
import { render } from '../../../test-utils'
import { spyOn } from '../../../utils/testing/spyOn'
import { SearchInput } from './SearchInput'

jest.mock('../../../../../hooks/recoil/useSearch')

describe('SearchInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should update apollo local state with input text', async () => {
    const setSearch = jest.fn()

    spyOn(useSearch, 'useSearch', () => ['', setSearch])

    const { getByLabelText } = await render(
      <SearchInput setSearch={() => null} search="mock" />
    )

    const searchValue = 'MOCK_FILE'

    await userEvent.type(getByLabelText('Search files'), searchValue)

    searchValue.split('').forEach((letter, index) => {
      expect(setSearch).toHaveBeenNthCalledWith(index + 1, letter)
    })
  })
})
