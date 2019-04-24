import React from 'react'
import { cleanup } from 'react-testing-library'
import { TOGGLES } from '../../../enums'
import { render } from '../../../test-utils'
import { Toggle } from './Toggle'

const MOCK_TOGGLE = TOGGLES.FOLK
const MOCK_SET_TOGGLE = jest.fn()

afterEach(cleanup)

describe('Toggle.tsx', () => {
  test('toggle matches snapshot', () => {
    const { asFragment } = render(
      <Toggle
        setToggle={MOCK_SET_TOGGLE}
        toggles={[TOGGLES.ROCK, TOGGLES.JAZZ, TOGGLES.FOLK, TOGGLES.ALL]}
        activeToggle={MOCK_TOGGLE}
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('toggle highlights correct cell', () => {
    const { getByTestId } = render(
      <Toggle
        setToggle={MOCK_SET_TOGGLE}
        toggles={[TOGGLES.ROCK, TOGGLES.JAZZ, TOGGLES.FOLK, TOGGLES.ALL]}
        activeToggle={MOCK_TOGGLE}
      />
    )

    const button = getByTestId(MOCK_TOGGLE)
    expect(button.classList.contains('toggle-active')).toBe(true)
  })
})
