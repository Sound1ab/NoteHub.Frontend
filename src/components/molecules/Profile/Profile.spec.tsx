import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from '../../../test-utils'
import { Profile } from './Profile'
import { AutoMockedProvider } from '../../utility/ApolloProvider/MockProvider'

afterEach(cleanup)

describe('Profile', () => {
  it('should ', () => {
    const { container } = render(
      <AutoMockedProvider>
        <Profile />
      </AutoMockedProvider>
    )

    expect(container).toBeDefined()
  })
})
