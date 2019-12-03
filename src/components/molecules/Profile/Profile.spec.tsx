import React from 'react'
import { cleanup, render } from '../../../test-utils'
import { Profile } from './Profile'
import { MockProvider } from '../../utility/ApolloProvider/MockProvider'

afterEach(cleanup)

describe('Profile', () => {
  it('should ', () => {
    const { container } = render(
      <MockProvider>
        <Profile />
      </MockProvider>
    )
    expect(container).toBeDefined()
  })
})
