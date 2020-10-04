import React from 'react'

import { useReadSearch } from '../../../hooks'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { SearchInput } from './SearchInput'

jest.mock('../../../hooks/localState/useReadSearch')

afterEach(cleanup)

describe('SearchInput', () => {
  const search = ''

  const client = { writeData: jest.fn() }

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useReadSearch as jest.Mock).mockImplementation(() => ({ search, client }))
  })

  it('should update apollo local state with input text', async () => {
    const { getByLabelText } = await render(
      <MockProvider>
        <SearchInput />
      </MockProvider>
    )

    // Insert file name into input
    const input = getByLabelText('Search files')

    await fireEvent.change(input, {
      target: { value: 'MOCK_FILE' },
    })

    expect(client.writeData).toBeCalledWith({ data: { search: 'MOCK_FILE' } })
  })
})
