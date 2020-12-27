import React from 'react'

import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers/ApolloProvider/MockProvider'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { SearchInput } from './SearchInput'

jest.mock('../../../../../hooks/localState/useReadSearch')

afterEach(cleanup)

describe('SearchInput', () => {
  const searchVar = jest.spyOn(localState, 'searchVar')

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    searchVar.mockRestore()
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

    expect(searchVar).toBeCalledWith('MOCK_FILE')
  })
})
