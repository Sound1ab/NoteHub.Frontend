import React, { ReactNode, createRef } from 'react'
import { useUpload } from 'react-use-upload'

import { useCodeMirror } from '../../../../../hooks/context/useCodeMirror'
import { useContextMenu } from '../../../../../hooks/utils/useContextMenu'
import { useDropzone } from '../../../../../hooks/utils/useDropzone'
import { useReadFile } from '../../../../../hooks/file/useReadFile'
import { useUpdateFile } from '../../../../../hooks/file/useUpdateFile'

import { resolvers } from '../../../../../schema/mockResolvers'
import {
  cleanup,
  fireEvent,
  reactHooks,
  render,
  renderHook,
  waitFor,
} from '../../../../../test-utils'
import { MockProvider } from '../../../../providers/ApolloProvider/MockProvider'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { ContextMenu } from './ContextMenu'

jest.mock('../../../../../hooks/context/useCodeMirror')
jest.mock('../../../../../hooks/utils/useContextMenu')
jest.mock('../../../../../hooks/file/useUpdateFile')
jest.mock('../../../../../hooks/file/useReadFile')
jest.mock('react-use-upload')
jest.mock('../../../../../hooks/image/useCreateSignedUrl', () => ({
  useCreateSignedUrl: () => [
    () => Promise.resolve({ data: { createSignedUrl: 'MOCK_IMAGE_PATH' } }),
  ],
}))

afterEach(cleanup)

describe('ContextMenu', () => {
  const toggleOrderedList = jest.fn()
  const toggleCodeBlock = jest.fn()
  const toggleUnorderedList = jest.fn()
  const toggleItalic = jest.fn()
  const toggleBold = jest.fn()
  const toggleBlockquote = jest.fn()
  const drawHorizontalRule = jest.fn()
  const drawLink = jest.fn()
  const drawTable = jest.fn()

  const updateFile = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCodeMirror as jest.Mock).mockReturnValue({
      actions: {
        toggleOrderedList,
        toggleCodeBlock,
        toggleUnorderedList,
        toggleItalic,
        toggleBold,
        toggleBlockquote,
        drawHorizontalRule,
        drawLink,
        drawTable,
      },
      editor: 'MOCK_EDITOR',
    })
    ;(useUpdateFile as jest.Mock).mockImplementation(() => [
      updateFile,
      { loading: false },
    ])
    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'MOCK FILE CONTENTS',
      },
    })
    ;(useContextMenu as jest.Mock).mockReturnValue({
      isOpen: true,
      Portal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      ref: createRef(),
      setOpen: jest.fn(),
    })
    ;(useUpload as jest.Mock).mockImplementation(
      (file: File | null, { getUrl }: { getUrl: () => void }) => {
        getUrl()

        return file
          ? {
              progress: 100,
              done: true,
            }
          : {
              progress: 0,
              done: false,
            }
      }
    )
  })

  it.each([
    [toggleItalic, 'Italic'],
    [toggleBold, 'Bold'],
    [toggleBlockquote, 'Quote'],
    [toggleOrderedList, 'Ordered'],
    [toggleUnorderedList, 'Unordered'],
    [toggleCodeBlock, 'Code block'],
    [drawHorizontalRule, 'Horizontal line'],
    [drawLink, 'Link'],
    [drawTable, 'Table'],
  ])('should call codemirror using buttons', async (fn, title) => {
    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () => localState.currentPathVar('MOCK_FILE_PATH_1.md'),
        }}
      >
        <ContextMenu targetRef={createRef()} />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(title))

    expect(fn).toBeCalled()
  })

  describe('When uploading an image', () => {
    it('should call updateFile with the currentPath and content if successfully uploaded', async () => {
      const {
        result: {
          current: { openFileDialog, Dropzone },
        },
      } = await renderHook(() => useDropzone())

      // We need to use this act when rendering hooks
      reactHooks.act(() => {
        openFileDialog()
      })

      const imageFilename = 'chucknorris.png'

      const file = new File(['(⌐□_□)'], imageFilename, {
        type: 'image/png',
      })

      const { getByLabelText } = await render(<Dropzone />)

      await reactHooks.act(async () => {
        await fireEvent.change(getByLabelText('Upload file'), {
          target: { files: [file] },
        })
      })

      expect(updateFile).toBeCalledWith(
        { content: 'MOCK FILE CONTENTS' },
        '![](MOCK_IMAGE_PATH)MOCK FILE CONTENTS'
      )
    })

    it('should display toast message while uploading', async () => {
      ;(useUpload as jest.Mock).mockImplementation(
        (file: File | null, { getUrl }: { getUrl: () => void }) => {
          getUrl()

          return file
            ? {
                progress: 50,
                done: false,
                loading: true,
              }
            : {
                progress: 0,
                done: false,
                loading: false,
              }
        }
      )

      const Wrapper = () => {
        const { Dropzone, openFileDialog } = useDropzone()

        return (
          <>
            <Dropzone />
            <button onClick={() => openFileDialog()}>Open file dialog</button>
          </>
        )
      }

      const { getByText, getByLabelText } = await render(<Wrapper />, {
        enableToast: true,
      })

      await fireEvent.click(getByText('Open file dialog'))

      const imageFilename = 'chucknorris.png'

      const file = new File(['(⌐□_□)'], imageFilename, {
        type: 'image/png',
      })

      await fireEvent.change(getByLabelText('Upload file'), {
        target: { files: [file] },
      })

      await waitFor(() =>
        expect(getByText('Upload in Progress')).toBeInTheDocument()
      )
    })

    it('should display toast alert if uploading an image errors', async () => {
      ;(useUpdateFile as jest.Mock).mockImplementation(() => [
        async () => {
          throw new Error('mock error')
        },
        { loading: false },
      ])

      const Wrapper = () => {
        const { Dropzone, openFileDialog } = useDropzone()

        return (
          <>
            <Dropzone />
            <button onClick={() => openFileDialog()}>Open file dialog</button>
          </>
        )
      }

      const { getByText, getByLabelText } = await render(<Wrapper />, {
        enableToast: true,
      })

      await fireEvent.click(getByText('Open file dialog'))

      const imageFilename = 'chucknorris.png'

      const file = new File(['(⌐□_□)'], imageFilename, {
        type: 'image/png',
      })

      await fireEvent.change(getByLabelText('Upload file'), {
        target: { files: [file] },
      })

      await waitFor(() =>
        expect(
          getByText('There was an issue uploading your image. mock error')
        ).toBeInTheDocument()
      )
    })
  })
})
