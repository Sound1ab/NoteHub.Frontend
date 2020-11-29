import '@testing-library/jest-dom/extend-expect'

import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { useReadRetextSettings } from '../../../../../hooks'
import { resolvers, user } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { Retext_Settings } from '../../../../apollo'
import { MockProvider } from '../../../../providers'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Profile } from './Profile'

jest.mock('../../../../../hooks/localState/useReadRetextSettings')

afterEach(cleanup)

describe('Profile', () => {
  let currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
  let retextSettingsVar = jest.spyOn(localState, 'retextSettingsVar')
  const retextSettings = {
    [Retext_Settings.Spell]: false,
    [Retext_Settings.Equality]: false,
    [Retext_Settings.IndefiniteArticle]: false,
    [Retext_Settings.RepeatedWords]: false,
    [Retext_Settings.Readability]: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
    retextSettingsVar = jest.spyOn(localState, 'retextSettingsVar')
    ;(useReadRetextSettings as jest.Mock).mockReturnValue(retextSettings)
  })

  afterEach(() => {
    currentJwtVar.mockRestore()
    retextSettingsVar.mockRestore()
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

      await fireEvent.click(getByLabelText('Light'))

      expect(getByLabelText('Dark')).toBeDefined()
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

    it.each([
      ['Spelling', Retext_Settings.Spell, true],
      ['Readability', Retext_Settings.Readability, true],
      ['Repeated Words', Retext_Settings.RepeatedWords, true],
      ['Indefinite Article', Retext_Settings.IndefiniteArticle, true],
      ['Equality', Retext_Settings.Equality, true],
    ])('should update retext settings', async (label, setting, value) => {
      const { getByText, getByAltText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByText(label))

      expect(retextSettingsVar).toBeCalledWith({
        ...retextSettings,
        [setting]: value,
      })
    })
  })
})
