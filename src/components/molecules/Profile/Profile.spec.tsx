import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { deleteFromStorage } from '../../../hooks/'
import { act, cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Profile } from './Profile'

jest.mock('../../../hooks/utils/useLocalStorage', () => {
  const originalModule = jest.requireActual(
    '../../../hooks/utils/useLocalStorage'
  )

  return {
    ...originalModule,
    deleteFromStorage: jest.fn(),
  }
})

afterEach(cleanup)

describe('Profile', () => {
  const user = {
    id: 1,
    login: 'MOCK_LOGIN',
    avatar_url: 'MOCK_AVATAR_URL',
    html_url: 'MOCK_HTML_URL',
    name: 'MOCK_NAME',
  }
  const resolvers = {
    Query: () => ({
      readGithubUser: () => user,
    }),
  }

  it('should display a profile', async () => {
    const { container } = await render(
      <MockProvider>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(container).toBeDefined()
  })

  it('should show a users avatar', async () => {
    const { getByAltText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(getByAltText('avatar')).toHaveAttribute('src', user.avatar_url)
  })

  describe('Dropdown', function() {
    it('should logout a user by deleting access token key from local storage', async () => {
      const { getByAltText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await act(() => wait(0))

      fireEvent.click(getByAltText('avatar'))

      fireEvent.click(getByLabelText('Logout'))

      expect(deleteFromStorage).toBeCalled()
    })

    it('should change color theme', async () => {
      const { getByAltText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await act(() => wait(0))

      fireEvent.click(getByAltText('avatar'))

      fireEvent.click(getByLabelText('Dark theme'))

      expect(getByLabelText('Light theme')).toBeDefined()
    })
  })
})
