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
  const openFileDialog = jest.fn()

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
      openFileDialog,
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
      [openFileDialog, 'Upload an image'],
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
        ;(useDropzone as jest.Mock).mockImplementation(() => ({
          Dropzone: () => <div>Dropzone</div>,
          openFileDialog,
          done: true,
          imagePath: 'MOCK_IMAGE_PATH',
        }))

        await render(
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

        expect(updateFile).toBeCalledWith(
          'MOCK_FILE_PATH_1.md',
          '![](MOCK_IMAGE_PATH)MOCK FILE CONTENTS'
        )
      })

      it('should display toast message while uploading', async () => {
        ;(useDropzone as jest.Mock).mockImplementation(() => ({
          Dropzone: () => <div>Dropzone</div>,
          openFileDialog,
          done: false,
          imagePath: 'MOCK_IMAGE_PATH',
          loading: true,
          progress: 50,
        }))

        const { getByText } = await render(
          <MockProvider
            mockResolvers={resolvers}
            localData={{
              currentPath: () =>
                localState.currentPathVar('MOCK_FILE_PATH_1.md'),
            }}
          >
            <Toolbar />
          </MockProvider>,
          // Otherwise test will hang when awaiting on fake timers
          { enableToast: true }
        )

        expect(getByText('Upload in Progress')).toBeInTheDocument()
      })

      it('should display toast alert if uploading an image errors', async () => {
        ;(useDropzone as jest.Mock).mockImplementation(() => ({
          Dropzone: () => <div>Dropzone</div>,
          openFileDialog,
          done: true,
          imagePath: 'MOCK_IMAGE_PATH',
        }))
        ;(useUpdateFile as jest.Mock).mockImplementation(() => [
          async () => {
            throw new Error('mock error')
          },
        ])

        const { getByTitle, getByText } = await render(
          <MockProvider
            mockResolvers={resolvers}
            localData={{
              currentPath: () =>
                localState.currentPathVar('MOCK_FILE_PATH_1.md'),
            }}
          >
            <Toolbar />
          </MockProvider>,
          { enableToast: true }
        )

        await fireEvent.click(getByTitle('Upload an image'))

        expect(
          getByText('There was an issue uploading your image. mock error')
        ).toBeInTheDocument()
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
      [openFileDialog, 'Upload an image'],
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
