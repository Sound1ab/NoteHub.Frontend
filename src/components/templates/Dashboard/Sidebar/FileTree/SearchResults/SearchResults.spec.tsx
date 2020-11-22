import React from 'react'

import { useReadSearch } from '../../../../../../hooks'
import { resolvers } from '../../../../../../schema/mockResolvers'
import { cleanup, render } from '../../../../../../test-utils'
import { MockProvider } from '../../../../../providers'
import { SearchResults } from './SearchResults'

jest.mock('../../../../../../hooks/localState/useReadSearch')

afterEach(cleanup)

describe('SearchResults', () => {
  const search = 'MOCK_FILE'

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useReadSearch as jest.Mock).mockImplementation(() => search)
  })

  it('should display all files', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <SearchResults />
      </MockProvider>
    )

    expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()
    expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()
  })

  it('should not display folders', async () => {
    const { queryByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <SearchResults />
      </MockProvider>
    )

    expect(queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()
  })

  it('should return null if there are no gitNodes', async () => {
    const { container } = await render(
      <MockProvider
        mockResolvers={{
          ...resolvers,
          Query: () => ({
            ...resolvers.Query(),
            readFiles: () => [],
          }),
        }}
      >
        <SearchResults />
      </MockProvider>
    )

    expect(container.firstChild).toBeNull()
  })
})
