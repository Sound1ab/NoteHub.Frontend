import { screen } from '@testing-library/react'
import React from 'react'

import { render } from '../../../../../test-utils'
import { typeInInputAndSubmit } from '../../../../../utils/testing/userActions'
import { FileInput } from './FileInput'

describe('FileInput', () => {
  const newFileName = 'Mock file Na/me'

  it('should call onSubmit with name', async () => {
    const onSubmit = jest.fn()

    await render(<FileInput onClickOutside={jest.fn()} onSubmit={onSubmit} />)

    await typeInInputAndSubmit('Input file name', 'File name form', newFileName)

    expect(onSubmit).toBeCalledWith(`${newFileName}`)
  })

  it('should call onClickOutside prop if passed in as prop', async () => {
    const onClickOutside = jest.fn()

    await render(
      <FileInput onClickOutside={onClickOutside} onSubmit={jest.fn()} />
    )

    await typeInInputAndSubmit('Input file name', 'File name form', newFileName)

    expect(onClickOutside).toBeCalled()
  })

  it('should add starting text if passed in as prop', async () => {
    await render(
      <FileInput
        onClickOutside={jest.fn()}
        onSubmit={jest.fn()}
        startingText="MOCK STARTING TEXT"
      />
    )

    expect(screen.getByLabelText('Input file name')).toHaveValue('MOCK STARTING TEXT')
  })
})
