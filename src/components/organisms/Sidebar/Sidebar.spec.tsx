import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Sidebar } from './Sidebar'

afterEach(cleanup)

jest.mock('../../../utils/scrollIntoView')

describe('Sidebar', () => {
  it('should toggle folders', async () => {
    const { getAllByLabelText, getByText, queryByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await fireEvent.click(getAllByLabelText('folder')[1])

    expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()

    await fireEvent.click(getAllByLabelText('folder')[1])

    expect(queryByText('MOCK_FILE_PATH_2.md')).not.toBeInTheDocument()

    await fireEvent.click(getAllByLabelText('folder')[1])

    expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()
  })

  it.skip('should toggle top level folder', async () => {
    const { queryByText, getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await fireEvent.click(getByText('Notes'))
    await fireEvent.click(getByText('Notes'))

    expect(queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()

    await fireEvent.click(getByText('Notes'))

    expect(getByText('MOCK_FOLDER_PATH')).toBeInTheDocument()
  })

  describe('when creating a file', () => {
    it('should toggle folder open if placed inside a closed folder', async () => {
      const { getAllByLabelText, getByText, getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Sidebar />
        </MockProvider>
      )

      const folderMenuIcon = getAllByLabelText('item menu')[0]

      // open dropdown
      await fireEvent.click(folderMenuIcon)

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
      const {
        getAllByLabelText,
        getByText,
        getByLabelText,
        queryByText,
      } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Sidebar />
        </MockProvider>
      )

      // Root level icon
      const folderMenuIcon = getAllByLabelText('item menu')[0]

      // open dropdown
      await fireEvent.click(folderMenuIcon)

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
      const {
        getAllByLabelText,
        getByText,
        getByLabelText,
        queryByText,
      } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Sidebar />
        </MockProvider>
      )

      const folder = getAllByLabelText('folder')[1]

      // open folder
      await fireEvent.click(folder)

      expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      // open file menu
      await fireEvent.click(getAllByLabelText('item menu')[2])

      await fireEvent.click(getByLabelText('Delete file'))

      expect(queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()
    })

    it('should remove folder if no other files exist', async () => {
      const {
        getAllByLabelText,
        getByText,
        getByLabelText,
        queryByText,
      } = await render(
        <MockProvider mockResolvers={resolvers}>
          <Sidebar />
        </MockProvider>
      )

      const folder = getAllByLabelText('folder')[1]

      // open folder
      await fireEvent.click(folder)

      expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      // open file menu
      await fireEvent.click(getAllByLabelText('item menu')[2])

      await fireEvent.click(getByLabelText('Delete file'))

      expect(queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      // open folder
      await fireEvent.click(folder)

      expect(getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()

      await fireEvent.click(getAllByLabelText('item menu')[2])

      await fireEvent.click(getByLabelText('Delete file'))

      expect(queryByText('MOCK_FILE_PATH_2.md')).not.toBeInTheDocument()

      expect(queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()
    })
  })
})
