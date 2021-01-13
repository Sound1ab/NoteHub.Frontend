import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { render } from '../../../../test-utils'
import { Sidebar } from './Sidebar'

jest.mock('../../../../utils/scrollIntoView')

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when searching', () => {
    it('should display search results instead of tree', async () => {
      await render(<Sidebar />)

      const input = screen.getByLabelText('Search files')

      await userEvent.type(input, 'MOCK_FILE')

      expect(screen.getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()
    })
  })
})
