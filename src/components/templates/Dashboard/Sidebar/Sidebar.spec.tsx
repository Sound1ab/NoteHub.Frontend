import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { resolvers } from '../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../test-utils'
import { MockProvider } from '../../../providers/ApolloProvider/MockProvider'
import { Sidebar } from './Sidebar'

afterEach(cleanup)

jest.mock('../../../../utils/scrollIntoView')

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when searching', () => {
    it('should display search results instead of tree', async () => {
      const { getByText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Sidebar />
        </MockProvider>
      )

      const input = getByLabelText('Search files')

      await fireEvent.change(input, {
        target: { value: 'MOCK_FILE' },
      })

      expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()
    })
  })
})
