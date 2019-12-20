import React from 'react'
import { cleanup, render, act } from '../../../test-utils'
import { Profile } from './Profile'
import { MockProvider } from '../../utility'
import { wait } from '@apollo/react-testing'

afterEach(cleanup)

describe('Profile', () => {
  it('should display a profile', async () => {
    const { container } = render(
      <MockProvider>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(container).toBeDefined()
  })
})
