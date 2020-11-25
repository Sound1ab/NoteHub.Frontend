import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { FileInput } from './FileInput'

afterEach(cleanup)

describe('FileInput', () => {
  const newFileName = 'Mock file Na/me'

  it('should call onSubmit with name', async () => {
    const onSubmit = jest.fn()

    const { getByLabelText } = await render(
      <FileInput
        onClickOutside={jest.fn()}
        onSubmit={onSubmit}
        isDisabled={false}
      />
    )

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: newFileName },
    })

    expect(input).toHaveAttribute('value', newFileName)

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(onSubmit).toBeCalledWith(`${newFileName}`)
  })
})
