import React from 'react'

import { render } from '../../../test-utils'
import { LandingPage } from './LandingPage'

describe('LandingPage', () => {
  it('should show login button', async () => {
    const { getByText } = await render(<LandingPage />)

    expect(getByText('Log in with Github')).toBeDefined()
  })
})
