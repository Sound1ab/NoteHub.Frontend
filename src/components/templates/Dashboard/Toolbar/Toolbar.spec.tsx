import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { render } from '../../../../test-utils'
import { Toolbar } from './Toolbar'

jest.mock('../../../../hooks/recoil/useTabs')

describe('Toolbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display tabs', async () => {
    await render(<Toolbar />)

    expect(screen.getByText('MOCK_PATH_0.md')).toBeInTheDocument()
    expect(screen.getByText('MOCK_PATH_1.md')).toBeInTheDocument()
  })

  it('should display dropdown when profile is clicked', async () => {
    await render(<Toolbar />)

    await userEvent.click(screen.getByAltText('avatar'))

    expect(screen.getByLabelText('dropdown')).toBeInTheDocument()
  })
})
