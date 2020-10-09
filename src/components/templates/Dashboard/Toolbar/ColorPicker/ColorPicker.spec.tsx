import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'

import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { ColorPicker } from './ColorPicker'

jest.mock('@apollo/react-hooks', () => {
  const originalModule = jest.requireActual('@apollo/react-hooks')

  return {
    ...originalModule,
    useApolloClient: jest.fn(),
  }
})

afterEach(cleanup)

describe('ColorPicker', () => {
  it('should change accent color', async () => {
    const writeData = jest.fn()
    ;(useApolloClient as jest.Mock).mockReturnValue({
      writeData,
    })

    const { getByTitle, getByLabelText } = await render(
      <MockProvider>
        <ColorPicker />
      </MockProvider>
    )

    await fireEvent.click(getByTitle('Set accent color'))

    await fireEvent.click(getByLabelText('primary swatch'))

    expect(writeData).toBeCalled()
  })
})
