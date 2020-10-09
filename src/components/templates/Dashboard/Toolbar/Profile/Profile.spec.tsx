import '@testing-library/jest-dom/extend-expect'

import { useApolloClient } from '@apollo/react-hooks'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { resolvers, user } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { Profile } from './Profile'

jest.mock('@apollo/react-hooks', () => {
  const originalModule = jest.requireActual('@apollo/react-hooks')

  return {
    ...originalModule,
    useApolloClient: jest.fn(),
  }
})

afterEach(cleanup)

describe('Profile', () => {
  const clearStore = jest.fn()
  const writeData = jest.fn()

  beforeEach(() => {
    jest.restoreAllMocks()
    const originalModule = jest.requireActual('@apollo/react-hooks')
    ;(useApolloClient as jest.Mock).mockImplementation(
      originalModule.useApolloClient
    )
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
      ;(useApolloClient as jest.Mock).mockReturnValue({
        clearStore,
        writeData,
      })

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

      expect(clearStore).toBeCalled()
      expect(writeData).toBeCalled()
    })

    it('should change color theme', async () => {
      const { getByAltText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByLabelText('Dark theme'))

      expect(getByLabelText('Light theme')).toBeDefined()
    })

    it('should display message if logout errors', async () => {
      ;(useApolloClient as jest.Mock).mockReturnValue({
        clearStore,
        writeData,
      })

      const alert = jest.fn()
      ;(global as any).alert = alert

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
