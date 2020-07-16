import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useDropzone, useEasyMDE } from '../../../hooks/'
import { resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Toolbar } from './Toolbar'

jest.mock('../../../hooks/utils/useDropzone')
jest.mock('../../../hooks/utils/useEasyMDE')

afterEach(cleanup)

describe('Toolbar', () => {
  const selectFileAndUpload = jest.fn()
  selectFileAndUpload.mockReturnValue(Promise.resolve('MOCK_PATH'))

  const toggleOrderedList = jest.fn()
  const toggleCodeBlock = jest.fn()
  const toggleUnorderedList = jest.fn()
  const toggleItalic = jest.fn()
  const toggleBold = jest.fn()
  const drawHorizontalRule = jest.fn()
  const toggleSideBySide = jest.fn()
  const toggleBlockquote = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useDropzone as jest.Mock).mockImplementation(() => ({
      Dropzone: () => <div>Dropzone</div>,
      selectFileAndUpload,
    }))
    ;(useEasyMDE as jest.Mock).mockReturnValue({
      toggleOrderedList,
      toggleCodeBlock,
      toggleUnorderedList,
      toggleItalic,
      toggleBold,
      drawHorizontalRule,
      toggleSideBySide,
      toggleBlockquote,
    })
  })

  describe('When a file is active', () => {
    it.each([
      [toggleItalic, 'Add italic'],
      [toggleBold, 'Add bold'],
      [toggleBlockquote, 'Add quote'],
      [toggleOrderedList, 'Add ordered list'],
      [toggleUnorderedList, 'Add unordered list'],
      [toggleCodeBlock, 'Add code block'],
      [drawHorizontalRule, 'Add horizontal line'],
      [toggleSideBySide, 'Toggle side by side'],
      [selectFileAndUpload, 'Upload an image'],
    ])('should call easyMDE using buttons', async (fn, title) => {
      const { getByTitle } = await render(
        <MockProvider
          mockResolvers={resolvers}
          localData={{ currentPath: 'MOCK_FILE_PATH_1.md' }}
        >
          <Toolbar />
        </MockProvider>
      )

      await fireEvent.click(getByTitle(title))

      expect(fn).toBeCalled()
    })
  })

  describe('When a file is not active', () => {
    it.each([
      [toggleItalic, 'Add italic'],
      [toggleBold, 'Add bold'],
      [toggleBlockquote, 'Add quote'],
      [toggleOrderedList, 'Add ordered list'],
      [toggleUnorderedList, 'Add unordered list'],
      [toggleCodeBlock, 'Add code block'],
      [drawHorizontalRule, 'Add horizontal line'],
      [toggleSideBySide, 'Toggle side by side'],
      [selectFileAndUpload, 'Upload an image'],
    ])('should call easyMDE using buttons', async (fn, title) => {
      const { getByTitle } = await render(
        <MockProvider
          mockResolvers={resolvers}
          localData={{ currentPath: 'MOCK_FOLDER_PATH' }}
        >
          <Toolbar />
        </MockProvider>
      )

      await fireEvent.click(getByTitle(title))

      expect(fn).not.toBeCalled()
    })
  })
})
