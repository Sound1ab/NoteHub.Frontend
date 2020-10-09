import React from 'react'

import { useDeleteFile } from '../../../../../hooks'
import { fileNodeOne, resolvers } from '../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { File } from './File'

jest.mock('../../../../../hooks/file/useDeleteFile')

describe('File', () => {
  const onToggle = jest.fn()

  const deleteFile = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [
      deleteFile,
      { error: undefined },
    ])
  })

  it('should show and hide inline file input when renaming file', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <div aria-label="outside">
          <File node={fileNodeOne} onToggle={onToggle} level={1} />
        </div>
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    await fireEvent.click(getByLabelText('Rename'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })

  it('should open file dropdown menu', async () => {
    const { getByLabelText, getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <File node={fileNodeOne} onToggle={onToggle} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    expect(getByText('Delete file')).toBeInTheDocument()
  })

  it('should call deleteFile when selected from file dropdown', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <File node={fileNodeOne} onToggle={onToggle} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    await fireEvent.click(getByLabelText('Delete file'))

    expect(deleteFile).toBeCalled()
  })

  it('should show alert if deleteFile returns an error', async () => {
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [
      async () => Promise.reject(),
    ])

    const alert = jest.fn()
    ;(global as any).alert = alert

    const { getByLabelText } = await render(
      <MockProvider>
        <File node={fileNodeOne} onToggle={onToggle} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    await fireEvent.click(getByLabelText('Delete file'))

    expect(alert).toBeCalledWith('Could not delete file. Please try again.')
  })
})
