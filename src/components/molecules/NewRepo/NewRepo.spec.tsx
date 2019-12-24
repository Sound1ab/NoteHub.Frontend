import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { NewRepo } from './NewRepo'
import { cleanup, fireEvent, render } from '../../../test-utils'

afterEach(cleanup)

describe('NewRepo', () => {
  it('should call setIsNewRepoOpen when clicked', () => {
    const setIsNewRepoOpen = jest.fn()

    const { getByText } = render(
      <NewRepo setIsNewRepoOpen={setIsNewRepoOpen} />
    )

    fireEvent.click(getByText('New Repo'))

    expect(setIsNewRepoOpen).toBeCalled()
  })
})
