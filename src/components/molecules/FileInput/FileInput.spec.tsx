import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateFile } from '../../../hooks'
import { folderNode, resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { FileInput } from './FileInput'

jest.mock('../../../hooks/file/useCreateFile')

afterEach(cleanup)

describe('FileInput', () => {
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
  })

  it('should create a new file when user submits form', async () => {
    const createNewFile = jest.fn()
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      createNewFile,
      { loading: false },
    ])

    const newFileName = 'Mock file Na/me'
    const path = folderNode.path

    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <FileInput path={path} onClickOutside={jest.fn()} />
      </MockProvider>
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
})
