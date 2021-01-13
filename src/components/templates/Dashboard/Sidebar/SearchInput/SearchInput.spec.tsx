import userEvent from '@testing-library/user-event'
import React from 'react'

import { render } from '../../../../../test-utils'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { SearchInput } from './SearchInput'

jest.mock('../../../../../hooks/localState/useReadSearch')

describe('SearchInput', () => {
  const searchVar = jest.spyOn(localState, 'searchVar')

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    searchVar.mockRestore()
  })

  it('should update apollo local state with input text', async () => {
    const { getByLabelText } = await render(<SearchInput />)

    const input = getByLabelText('Search files')

    await userEvent.type(input, 'MOCK_FILE')

    expect(searchVar).toBeCalledWith('MOCK_FILE')
  })
})
