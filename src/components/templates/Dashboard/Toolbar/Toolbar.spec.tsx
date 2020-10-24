import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import {
  useDropzone,
  useEasyMDE,
  useReadFile,
  useUpdateFile,
} from '../../../../hooks'
import { resolvers } from '../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../test-utils'
import { MockProvider } from '../../../providers'
import { localState } from '../../../providers/ApolloProvider/cache'
import { Toolbar } from './Toolbar'

jest.mock('../../../../hooks/utils/useDropzone')
jest.mock('../../../../hooks/utils/useEasyMDE')
jest.mock('../../../../hooks/file/useUpdateFile')
jest.mock('../../../../hooks/file/useReadFile')

afterEach(cleanup)

describe('Toolbar', () => {
  const selectFileAndUpload = jest.fn(() => Promise.resolve('MOCK_PATH'))

  const toggleOrderedList = jest.fn()
  const toggleCodeBlock = jest.fn()
  const toggleUnorderedList = jest.fn()
  const toggleItalic = jest.fn()
  const toggleBold = jest.fn()
  const toggleSideBySide = jest.fn()
  const toggleBlockquote = jest.fn()
  const drawHorizontalRule = jest.fn()
  const drawLink = jest.fn()
  const drawTable = jest.fn()

  const updateFile = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
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
      toggleSideBySide,
      toggleBlockquote,
      drawHorizontalRule,
      drawLink,
      drawTable,
    })
    ;(useUpdateFile as jest.Mock).mockImplementation(() => [updateFile])
    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'MOCK FILE CONTENTS',
      },
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
      [drawLink, 'Add link'],
      [drawTable, 'Add table'],
      [toggleSideBySide, 'Toggle side by side'],
      [selectFileAndUpload, 'Upload an image'],
    ])('should call easyMDE using buttons', async (fn, title) => {
      const { getByTitle } = await render(
        <MockProvider
          mockResolvers={resolvers}
          localData={{
            currentPath: () => localState.currentPathVar('MOCK_FILE_PATH_1.md'),
          }}
        >
          <Toolbar />
        </MockProvider>
      )

      await fireEvent.click(getByTitle(title))

      expect(fn).toBeCalled()
    })

    describe('When uploading an image', () => {
      it('should call updateFile with the currentPath and content if successfully uploaded', async () => {
        const { getByTitle } = await render(
          <MockProvider
            mockResolvers={resolvers}
            localData={{
              currentPath: () =>
                localState.currentPathVar('MOCK_FILE_PATH_1.md'),
            }}
          >
            <Toolbar />
          </MockProvider>
        )

        await fireEvent.click(getByTitle('Upload an image'))

        expect(updateFile).toBeCalledWith(
          'MOCK_FILE_PATH_1.md',
          '![](https://github.com/Sound1ab/NoteHub.Notebook/blob/master/MOCK_PATH?raw=true)MOCK FILE CONTENTS'
        )
      })

      it('should display alert if uploading an image errors', async () => {
        ;(useUpdateFile as jest.Mock).mockImplementation(() => [
          async () => Promise.reject(),
        ])

        const alert = jest.fn()
        global.alert = alert

        const { getByTitle } = await render(
          <MockProvider
            mockResolvers={resolvers}
            localData={{
              currentPath: () =>
                localState.currentPathVar('MOCK_FILE_PATH_1.md'),
            }}
          >
            <Toolbar />
          </MockProvider>
        )

        await fireEvent.click(getByTitle('Upload an image'))

        expect(alert).toBeCalled()
      })
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
      [drawLink, 'Add link'],
      [drawTable, 'Add table'],
      [toggleSideBySide, 'Toggle side by side'],
      [selectFileAndUpload, 'Upload an image'],
    ])('should call easyMDE using buttons', async (fn, title) => {
      const { getByTitle } = await render(
        <MockProvider
          mockResolvers={resolvers}
          localData={{
            currentPath: () => localState.currentPathVar('MOCK_FOLDER_PATH'),
          }}
        >
          <Toolbar />
        </MockProvider>
      )

      await fireEvent.click(getByTitle(title))

      expect(fn).not.toBeCalled()
    })
  })
})
