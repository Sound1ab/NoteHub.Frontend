import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateFile } from '../../../hooks'
import { folderNode } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { FileInput } from './FileInput'

jest.mock('../../../hooks/file/useCreateFile')

afterEach(cleanup)

describe('FileInput', () => {
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
  })

  const newFileName = 'Mock file Na/me'
  const path = folderNode.path

  it('should create a new file when user submits form', async () => {
    const createNewFile = jest.fn()
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      createNewFile,
      { loading: false },
    ])

    const { getByLabelText } = await render(
      <FileInput path={path} onClickOutside={jest.fn()} onToggle={jest.fn()} />
    )

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: newFileName },
    })

    expect(input).toHaveAttribute('value', newFileName)

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(createNewFile).toBeCalledWith(`${path}/${newFileName}.md`)
  })

  it('should display error message if create file fails', async () => {
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      async () => Promise.reject(),
      { loading: false },
    ])

    const alert = jest.fn()
    ;(global as any).alert = alert

    const { getByLabelText } = await render(
      <FileInput path={path} onClickOutside={jest.fn()} onToggle={jest.fn()} />
    )

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: newFileName },
    })

    expect(input).toHaveAttribute('value', newFileName)

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(alert).toBeCalledWith('Could not create file. Please try again.')
  })
})
