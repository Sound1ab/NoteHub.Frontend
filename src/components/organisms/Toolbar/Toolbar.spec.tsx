import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useDropzone } from '../../../hooks/'
import { resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Toolbar } from './Toolbar'

jest.mock('../../../hooks/utils/useDropzone')

afterEach(cleanup)

describe('Toolbar', () => {
  const selectFileAndUpload = jest.fn()
  selectFileAndUpload.mockReturnValue(Promise.resolve('MOCK_PATH'))

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useDropzone as jest.Mock).mockImplementation(() => ({
      Dropzone: () => <div>Dropzone</div>,
      selectFileAndUpload,
    }))
  })

  it('should toggle edit mode', async () => {
    const { getByTitle } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByTitle('View file in preview'))

    expect(getByTitle('View file in markdown')).toBeInTheDocument()
  })

  it('should call selectFileAndUpload', async () => {
    const { getByTitle } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByTitle('Upload an image'))

    expect(selectFileAndUpload).toBeCalled()
  })
})
