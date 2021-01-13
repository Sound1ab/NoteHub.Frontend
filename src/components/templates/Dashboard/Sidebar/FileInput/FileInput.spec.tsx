import React from 'react'

import { render } from '../../../../../test-utils'
import { typeInInputAndSubmit } from '../../../../../utils/testing/userActions'
import { FileInput } from './FileInput'

describe('FileInput', () => {
  const newFileName = 'Mock file Na/me'

  it('should call onSubmit with name', async () => {
    const onSubmit = jest.fn()

    await render(
      <FileInput
        onClickOutside={jest.fn()}
        onSubmit={onSubmit}
        isDisabled={false}
      />
    )

    await typeInInputAndSubmit('Input file name', 'File name form', newFileName)

    expect(onSubmit).toBeCalledWith(`${newFileName}`)
  })
})
