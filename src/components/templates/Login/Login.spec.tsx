import React from 'react'

import { render } from '../../../test-utils'
import { Login } from './Login'

describe('Login', () => {
  it('should show login button', async () => {
    const { getByText } = await render(<Login />)

    expect(getByText('Log in with Github')).toBeDefined()
  })
})
