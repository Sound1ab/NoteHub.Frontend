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

  it('should create a new file', async () => {
    const { getAllByLabelText, getByText, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await fireEvent.click(getAllByLabelText('item menu')[1])

    await fireEvent.click(getByLabelText('Create file'))

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: 'NEW_MOCK_FILE_NAME' },
    })

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()
  })

  it('should delete a file', async () => {
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

    expect(getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

    await fireEvent.click(getAllByLabelText('item menu')[2])

    await fireEvent.click(getByLabelText('Delete file'))

    expect(queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()
  })
})
