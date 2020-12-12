import '@testing-library/jest-dom/extend-expect'

import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { FONT, THEME_SETTINGS } from '../../../../../enums'
import {
  useReadRetextSettings,
  useReadThemeSettings,
} from '../../../../../hooks'
import { resolvers, user } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { Retext_Settings } from '../../../../apollo'
import { MockProvider } from '../../../../providers'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Profile } from './Profile'

jest.mock('../../../../../hooks/localState/useReadRetextSettings')
jest.mock('../../../../../hooks/localState/useReadThemeSettings')

afterEach(cleanup)

describe('Profile', () => {
  let currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
  let retextSettingsVar = jest.spyOn(localState, 'retextSettingsVar')
  let themeSettingsVar = jest.spyOn(localState, 'themeSettingsVar')
  const retextSettings = {
    [Retext_Settings.Spell]: false,
    [Retext_Settings.Equality]: false,
    [Retext_Settings.IndefiniteArticle]: false,
    [Retext_Settings.RepeatedWords]: false,
    [Retext_Settings.Readability]: false,
  }
  const themeSettings = {
    [THEME_SETTINGS.IS_LIGHT_THEME]: false,
    [THEME_SETTINGS.IS_FULL_WIDTH]: false,
    [THEME_SETTINGS.IS_LARGE_TEXT]: false,
    [THEME_SETTINGS.FONT]: FONT.IS_DEFAULT,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
    retextSettingsVar = jest.spyOn(localState, 'retextSettingsVar')
    themeSettingsVar = jest.spyOn(localState, 'themeSettingsVar')
    ;(useReadRetextSettings as jest.Mock).mockReturnValue(retextSettings)
    ;(useReadThemeSettings as jest.Mock).mockReturnValue(themeSettings)
  })

  afterEach(() => {
    currentJwtVar.mockRestore()
    retextSettingsVar.mockRestore()
    themeSettingsVar.mockRestore()
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

    it.each([
      ['Light mode', THEME_SETTINGS.IS_LIGHT_THEME, true],
      ['Full width', THEME_SETTINGS.IS_FULL_WIDTH, true],
      ['Large text', THEME_SETTINGS.IS_LARGE_TEXT, true],
      ['Mono', THEME_SETTINGS.FONT, FONT.IS_MONO],
      ['Serif', THEME_SETTINGS.FONT, FONT.IS_SERIF],
    ])('should update theme settings', async (label, setting, value) => {
      const { getByText, getByAltText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Profile />
        </MockProvider>
      )

      await fireEvent.click(getByAltText('avatar'))

      await fireEvent.click(getByText(label))

      expect(themeSettingsVar).toBeCalledWith({
        ...themeSettings,
        [setting]: value,
      })
    })
  })
})
