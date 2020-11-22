import '@testing-library/jest-dom/extend-expect'

import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { resolvers, user } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Profile } from './Profile'

afterEach(cleanup)

describe('Profile', () => {
  let currentJwtVar = jest.spyOn(localState, 'currentJwtVar')

  beforeEach(() => {
    jest.clearAllMocks()
    currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
  })

  afterEach(() => {
    currentJwtVar.mockRestore()
  })

  it('should display a profile', async () => {
    const { container } = await render(
      <MockProvider>
        <Profile />
      </MockProvider>
    )

    expect(container).toBeDefined()
  })

  it('should show a users avatar', async () => {
    const { getByAltText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Profile />
      </MockProvider>
    )

    expect(getByAltText('avatar')).toHaveAttribute('src', user.avatar_url)
  })

  describe('Dropdown', function () {
    it('should clear apollo store and deauth use when they logout', async () => {
      const history = createMemoryHistory()

      const { getByAltText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Router history={history}>
            <Profile />
          </Router>
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByLabelText('Logout'))

      expect(currentJwtVar).toBeCalledWith(null)
    })

    it('should change color theme', async () => {
      const { getByAltText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByLabelText('Light theme'))

      expect(getByLabelText('Dark theme')).toBeDefined()
    })

    it('should display message if logout errors', async () => {
      const alert = jest.fn()
      global.alert = alert

      const { getByAltText, getByLabelText } = await render(
        <MockProvider
          mockResolvers={{
            ...resolvers,
            Query: () => ({
              ...resolvers.Query(),
              logout: () => {
                throw new Error()
              },
            }),
          }}
        >
          <Profile />
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByLabelText('Logout'))

      expect(alert).toBeCalledWith('Could not logout. Please try again.')
    })
  })
})
