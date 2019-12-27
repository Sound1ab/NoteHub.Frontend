import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { deleteFromStorage } from '../../../hooks/'
import { resolvers, user } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
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

  describe('Dropdown', function() {
    it('should logout a user by deleting access token key from local storage', async () => {
      const { getByAltText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByLabelText('Logout'))

      expect(deleteFromStorage).toBeCalled()
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
  })
})
