import React from 'react'

import { resolvers } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { FileTree } from './FileTree'

afterEach(cleanup)

jest.mock('../../../../../utils/scrollIntoView')

describe('FileTree', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should toggle folders', async () => {
    const { getByText, queryByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />
      </MockProvider>
    )

    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()

    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    expect(queryByText('MOCK_FILE_PATH_2.md')).not.toBeInTheDocument()

    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()
  })

  describe('file input', () => {
    it('should show file input if passed prop', async () => {
      const { getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={true} closeNewFile={jest.fn()} />
        </MockProvider>
      )

      expect(getByLabelText('Input file name')).toBeInTheDocument()
    })

    it('should call closeNewFile if deselected ', async () => {
      const closeNewFile = jest.fn()

      const { container } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={true} closeNewFile={closeNewFile} />
        </MockProvider>
      )

      await fireEvent.mouseUp(container)

      expect(closeNewFile).toBeCalled()
    })
  })

  describe('when creating a file', () => {
    it('should toggle folder open if placed inside a closed folder', async () => {
      const { getByText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />
        </MockProvider>
      )

      // open dropdown
      await fireEvent.click(getByLabelText('MOCK_FOLDER_PATH actions'))

      // open new file
      await fireEvent.click(getByLabelText('Create file'))

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: 'MOCK_FOLDER_PATH/NEW_MOCK_FILE_NAME' },
      })

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()
    })

    it('should be possible to toggle newly created folder', async () => {
      const { getByText, getByLabelText, queryByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />
        </MockProvider>
      )

      // open dropdown
      await fireEvent.click(getByLabelText('MOCK_FOLDER_PATH actions'))

      // open new file input
      await fireEvent.click(getByLabelText('Create file'))

      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: 'MOCK_FOLDER_PATH_OTHER/NEW_MOCK_FILE_NAME' },
      })

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()

      // click new folder
      await fireEvent.click(getByText('MOCK_FOLDER_PATH_OTHER'))

      expect(getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()

      // click new folder
      await fireEvent.click(getByText('MOCK_FOLDER_PATH_OTHER'))

      expect(queryByText('NEW_MOCK_FILE_NAME.md')).not.toBeInTheDocument()
    })
  })

  describe('when deleting a file', () => {
    it('should remove file but keep folder open if other files exist', async () => {
      const { getByText, getByLabelText, queryByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />
        </MockProvider>
      )

      const folder = getByText('MOCK_FOLDER_PATH')

      // open folder
      await fireEvent.click(folder)

      expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      // open file menu
      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

      await fireEvent.click(getByLabelText('Delete file'))

      expect(queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()
    })

    it('should remove folder if no other files exist', async () => {
      const { getByText, getByLabelText, queryByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />
        </MockProvider>
      )

      // open folder
      await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

      expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()

      // open file menu
      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

      await fireEvent.click(getByLabelText('Delete file'))

      expect(queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()

      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_2.md actions'))

      await fireEvent.click(getByLabelText('Delete file'))

      expect(queryByText('MOCK_FILE_PATH_2.md')).not.toBeInTheDocument()

      expect(queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()
    })
  })

  describe('when renaming a file or folder', () => {
    it('should move the file or folder to a new name', async () => {
      const { getByText, getByLabelText, queryByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />
        </MockProvider>
      )

      // open folder
      await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

      expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      // open file menu
      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

      await fireEvent.click(getByLabelText('Rename'))

      // Insert file name into input and submit
      const input = getByLabelText('Input file name')

      await fireEvent.change(input, {
        target: { value: 'NEW_MOCK_FILE_PATH' },
      })

      expect(input).toHaveAttribute('value', 'NEW_MOCK_FILE_PATH')

      const form = getByLabelText('File name form')

      await fireEvent.submit(form)

      expect(queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      expect(getByText('NEW_MOCK_FILE_PATH.md')).toBeInTheDocument()
    })
  })
})
