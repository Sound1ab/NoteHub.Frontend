import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { cleanup, fireEvent, render } from '../../../test-utils'
import { NewRepo } from './NewRepo'

afterEach(cleanup)

describe('NewRepo', () => {
  it('should call setIsNewRepoOpen when clicked', async () => {
    const setIsNewRepoOpen = jest.fn()

    const { getByText } = await render(
      <NewRepo setIsNewRepoOpen={setIsNewRepoOpen} />
    )

    fireEvent.click(getByText('New Repo'))

    expect(setIsNewRepoOpen).toBeCalled()
  })
})
