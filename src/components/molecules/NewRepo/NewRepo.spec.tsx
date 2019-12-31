import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCommand } from '../../../hooks'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { NewRepo } from './NewRepo'

jest.mock('../../../hooks/monaco/useCommand')

afterEach(cleanup)

describe('NewRepo', () => {
  const handleSetIsNewRepoOpen = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useCommand as jest.Mock).mockReturnValue({
      handleSetIsNewRepoOpen,
    })
  })

  it('should call handleSetIsNewRepoOpen when clicked', async () => {
    const { getByText } = await render(<NewRepo />)

    await fireEvent.click(getByText('New Repo'))

    expect(handleSetIsNewRepoOpen).toBeCalled()
  })
})
