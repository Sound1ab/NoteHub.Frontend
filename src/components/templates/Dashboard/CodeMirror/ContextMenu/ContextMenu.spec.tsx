import React, { ReactNode, createRef } from 'react'
import { useUpload } from 'react-use-upload'

import { useCodeMirror } from '../../../../../hooks/codeMirror/useCodeMirror'
import { useEditor } from '../../../../../hooks/codeMirror/useEditor'
import { useContextMenu } from '../../../../../hooks/utils/useContextMenu'
import { useDropzone } from '../../../../../hooks/utils/useDropzone'
import {
  fireEvent,
  reactHooks,
  render,
  renderHook,
  waitFor,
} from '../../../../../test-utils'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { ContextMenu } from './ContextMenu'

jest.mock('../../../../../hooks/codeMirror/useCodeMirror')
jest.mock('../../../../../hooks/utils/useContextMenu')
jest.mock('../../../../../hooks/codeMirror/useEditor')

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
  const drawTableComponent = jest.fn()
  const drawTodoListComponent = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCodeMirror as jest.Mock).mockReturnValue([
      {
        toggleOrderedList,
        toggleCodeBlock,
        toggleUnorderedList,
        toggleItalic,
        toggleBold,
        toggleBlockquote,
        drawHorizontalRule,
        drawLink,
        drawTable,
        drawTableComponent,
        drawTodoListComponent,
      },
    ])
    ;(useContextMenu as jest.Mock).mockReturnValue({
      isOpen: true,
      Portal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
      ref: createRef(),
      setOpen: jest.fn(),
    })
    ;(useEditor as jest.Mock).mockReturnValue({
      editor: { setValue: jest.fn(), getValue: () => 'MOCK CONTENT' },
    })
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
    // [drawTableComponent, 'Table component'],
    // [drawTodoListComponent, 'TodoList component'],
  ])('should call codemirror using buttons', async (fn, title) => {
    localState.currentPathVar('MOCK_FILE_PATH_1.md')

    const { getByLabelText } = await render(<ContextMenu />)

    await fireEvent.click(getByLabelText(title))

    expect(fn).toBeCalled()
  })

  // TODO: PLACE THESE SOMEWHERE BETTER
  describe('When uploading an image', () => {
    it('should call updateFile with the currentPath and content if successfully uploaded', async () => {
      const setValue = jest.fn()

      ;(useEditor as jest.Mock).mockReturnValue({
        editor: { setValue, getValue: () => 'MOCK CONTENT' },
      })

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

      expect(setValue).toBeCalledWith('![](MOCK_IMAGE_PATH)MOCK CONTENT')
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

    it.skip('should display toast alert if uploading an image errors', async () => {
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
