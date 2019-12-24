import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { deleteFromStorage } from '../../../hooks/'
import { act, cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Profile } from './Profile'

jest.mock('../../../hooks/utils/useLocalStorage')

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
    const { container } = render(
      <MockProvider>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(container).toBeDefined()
  })

  it('should show dropdown when clicked', async () => {
    const { getByAltText, getByLabelText } = render(
      <MockProvider mockResolvers={resolvers}>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByAltText('avatar'))

    expect(getByLabelText('Profile options')).toBeDefined()
  })

  it('should show a users avatar', async () => {
    const { getByAltText } = render(
      <MockProvider mockResolvers={resolvers}>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(getByAltText('avatar')).toHaveAttribute('src', user.avatar_url)
  })

  it('should logout a user by deleting access token key from local storage', async () => {
    const { getByAltText, getByLabelText } = render(
      <MockProvider mockResolvers={resolvers}>
        <Profile />
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByAltText('avatar'))

    fireEvent.click(getByLabelText('Logout'))

    expect(deleteFromStorage).toBeCalled()
  })
})
