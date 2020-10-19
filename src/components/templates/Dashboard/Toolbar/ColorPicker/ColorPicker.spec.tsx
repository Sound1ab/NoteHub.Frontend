import React from 'react'

import { resolvers } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { ColorPicker } from './ColorPicker'

afterEach(cleanup)

describe('ColorPicker', () => {
  const accentColorVar = jest.spyOn(localState, 'accentColorVar')

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterEach(() => {
    accentColorVar.mockRestore()
  })

  it.skip('should change accent color', async () => {
    const { getByTitle, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <ColorPicker />
      </MockProvider>
    )

    await fireEvent.click(getByTitle('Set accent color'))

    await fireEvent.click(getByLabelText('primary swatch'))

    expect(accentColorVar).toBeCalled()
  })
})
