import '@testing-library/jest-dom/extend-expect'

import { screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import { FONT } from '../../../../../enums'
import * as useEquality from '../../../../../hooks/recoil/retext/useEquality'
import * as useIndefiniteArticle from '../../../../../hooks/recoil/retext/useIndefiniteArticle'
import * as useReadability from '../../../../../hooks/recoil/retext/useReadability'
import * as useRepeatedWords from '../../../../../hooks/recoil/retext/useRepeatedWords'
import * as useSpelling from '../../../../../hooks/recoil/retext/useSpelling'
import * as useFont from '../../../../../hooks/recoil/theme/useFont'
import * as useFullWidth from '../../../../../hooks/recoil/theme/useFullWidth'
import * as useLargeText from '../../../../../hooks/recoil/theme/useLargeText'
import * as useLightTheme from '../../../../../hooks/recoil/theme/useLightTheme'
import { resolvers, user } from '../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../test-utils'
import { spyOn } from '../../../../../utils/testing/spyOn'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { MockProvider } from '../../../../providers/ApolloProvider/MockProvider'
import { Profile } from './Profile'

jest.mock('../../../../../hooks/recoil/retext/useEquality')
jest.mock('../../../../../hooks/recoil/retext/useIndefiniteArticle')
jest.mock('../../../../../hooks/recoil/retext/useReadability')
jest.mock('../../../../../hooks/recoil/retext/useRepeatedWords')
jest.mock('../../../../../hooks/recoil/retext/useSpelling')
jest.mock('../../../../../hooks/recoil/theme/useFont')
jest.mock('../../../../../hooks/recoil/theme/useFullWidth')
jest.mock('../../../../../hooks/recoil/theme/useLargeText')
jest.mock('../../../../../hooks/recoil/theme/useLightTheme')

describe('Profile', () => {
  let currentJwtVar = jest.spyOn(localState, 'currentJwtVar')

  const setEquality = jest.fn()
  const setIndefiniteArticle = jest.fn()
  const setReadability = jest.fn()
  const setRepeatedWords = jest.fn()
  const setSpelling = jest.fn()
  const setFont = jest.fn()
  const setFullWidth = jest.fn()
  const setLargeText = jest.fn()
  const setLightTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    currentJwtVar = jest.spyOn(localState, 'currentJwtVar')

    spyOn(useEquality, 'useEquality', () => [false, setEquality])
    spyOn(useIndefiniteArticle, 'useIndefiniteArticle', () => [
      false,
      setIndefiniteArticle,
    ])
    spyOn(useReadability, 'useReadability', () => [false, setReadability])
    spyOn(useRepeatedWords, 'useRepeatedWords', () => [false, setRepeatedWords])
    spyOn(useSpelling, 'useSpelling', () => [false, setSpelling])
    spyOn(useFont, 'useFont', () => [false, setFont])
    spyOn(useFullWidth, 'useFullWidth', () => [false, setFullWidth])
    spyOn(useLargeText, 'useLargeText', () => [false, setLargeText])
    spyOn(useLightTheme, 'useLightTheme', () => [false, setLightTheme])
  })

  afterEach(() => {
    currentJwtVar.mockRestore()
  })

  it('should display a profile', async () => {
    const { container } = await render(<Profile />)

    expect(container).toBeDefined()
  })

  it('should show a users avatar', async () => {
    await render(<Profile />)

    expect(screen.getByAltText('avatar')).toHaveAttribute(
      'src',
      user.avatar_url
    )
  })

  describe('Dropdown', function () {
    it('should clear apollo store and deauth use when they logout', async () => {
      const history = createMemoryHistory()

      await render(
        <Router history={history}>
          <Profile />
        </Router>
      )

      await fireEvent.click(screen.getByAltText('avatar'))

      await fireEvent.click(screen.getByLabelText('Logout'))

      expect(currentJwtVar).toBeCalledWith(null)
    })

    it('should display message if logout errors', async () => {
      const alert = jest.fn()
      global.alert = alert

      await render(
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

      await fireEvent.click(screen.getByAltText('avatar'))

      await fireEvent.click(screen.getByLabelText('Logout'))

      expect(alert).toBeCalledWith('Could not logout. Please try again.')
    })

    xit.each([
      ['Spelling', setSpelling],
      ['Readability', setReadability],
      ['Repeated Words', setRepeatedWords],
      ['Indefinite Article', setIndefiniteArticle],
      ['Equality', setEquality],
    ])('should update %s setting', async (label, fn) => {
      await render(<Profile />)

      await fireEvent.click(screen.getByAltText('avatar'))

      await fireEvent.click(screen.getByText(label))

      expect(fn).toBeCalledWith(true)
    })

    xit.each([
      ['Light mode', setLightTheme, true],
      ['Full width', setFullWidth, true],
      ['Large text', setLargeText, true],
      ['Mono', setFont, FONT.IS_MONO],
      ['Serif', setFont, FONT.IS_SERIF],
    ])('should update %s settings', async (label, fn, value) => {
      await render(<Profile />)

      await fireEvent.click(screen.getByAltText('avatar'))

      await fireEvent.click(screen.getByText(label))

      expect(fn).toBeCalledWith(value)
    })
  })
})
