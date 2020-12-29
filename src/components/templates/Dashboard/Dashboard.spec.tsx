import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { files, resolvers } from '../../../schema/mockResolvers'
import { fireEvent, render, waitFor } from '../../../test-utils'
import { createNodes } from '../../../utils/createNodes'
import { Node_Type } from '../../apollo/generated_components_typings'
import { localState } from '../../providers/ApolloProvider/cache'
import Dashboard from './Dashboard'
import { FileTree } from './Sidebar/FileTree/FileTree'

jest.setTimeout(10000)

jest.mock('../../../utils/debounce', () => ({
  debounce: (fn: (...rest: unknown[]) => void) => (...args: unknown[]) =>
    fn(...args),
}))
jest.mock('../../../utils/scrollIntoView')
jest.mock('react-use-upload', () => ({
  useUpload: (file: File | null, { getUrl }: { getUrl: () => void }) => {
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
  },
}))
jest.mock('../../../hooks/image/useCreateSignedUrl', () => ({
  useCreateSignedUrl: () => [
    () => Promise.resolve({ data: { createSignedUrl: 'MOCK_IMAGE_PATH' } }),
  ],
}))

describe('Dashboard', () => {
  // Mocking out for codemirror as JSDOM doesn't do this
  // @ts-ignore
  global.document.createRange = () => {
    return {
      setEnd: jest.fn(),
      setStart: jest.fn(),
      getBoundingClientRect: function () {
        return { right: 0 }
      },
      getClientRects: function () {
        return {
          length: 0,
          left: 0,
          right: 0,
        }
      },
    }
  }

  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should add folder and file', async () => {
    const { getByText, getByLabelText } = await render(<Dashboard />)

    await fireEvent.click(getByLabelText('MOCK_FOLDER_PATH actions'))

    await fireEvent.click(getByLabelText('Create file'))

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: 'NEW_MOCK_FILE_NAME' },
    })

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()
  })

  // it.skip('should display an error message and close the file input if there was a problem', async () => {})

  // it.skip('should delete file if repo and file is selected', async () => {})

  it('should insert uploaded image at cursor position', async () => {
    const { path } = fileNode
    localState.currentPathVar(path)

    const { getByLabelText, getByText } = await render(<Dashboard />)

    await fireEvent.contextMenu(getByLabelText('Markdown editor'))

    await fireEvent.click(getByLabelText('Image'))

    const imageFilename = 'chucknorris.png'

    const file = new File(['(⌐□_□)'], imageFilename, {
      type: 'image/png',
    })

    await fireEvent.change(getByLabelText('Upload file'), {
      target: { files: [file] },
    })

    await waitFor(
      () => expect(getByText('MOCK_IMAGE_PATH')).toBeInTheDocument(),
      { timeout: 7000 }
    )
  })

  it.skip('should show alert if deleting a file errors', async () => {
    const { path } = fileNode
    localState.currentPathVar(path)

    const { getByLabelText, getByText } = await render(<Dashboard />, {
      enableToast: true,
      resolvers: {
        ...resolvers,
        Mutation: () => ({
          ...resolvers.Mutation(),
          deleteFile: (): File => {
            throw new Error('mock error')
          },
        }),
      },
    })

    // Open folder
    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    // Open dropdown
    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    // Delete file
    await fireEvent.click(getByLabelText('Delete file'))

    await waitFor(() =>
      expect(
        getByText(
          'There was an issue deleting your file. Error: Delete file: no file returned'
        )
      ).toBeInTheDocument()
    )
  })

  it.skip('should show mdx preview when preview is toggled', async () => {
    const { path } = fileNode
    localState.currentPathVar(path)

    const { getByTitle, container } = await render(<Dashboard />)

    await fireEvent.click(getByTitle('Toggle side by side'))

    const heading = container.querySelector('h1')

    expect(heading).toContainHTML('<h1>MOCK_CONTENT</h1>')
  })

  it('should add tabs when files are selected in the sidebar and close them', async () => {
    const { getByText, getByTitle } = await render(<Dashboard />)

    await userEvent.click(getByText('MOCK_FILE_PATH_3.md'))

    await act(async () => {
      await userEvent.click(getByText('MOCK_FOLDER_PATH'))
    })

    await act(async () => {
      await userEvent.click(getByText('MOCK_FILE_PATH_1.md'))
    })

    const tabOne = getByTitle('MOCK_FILE_PATH_3.md')
    const tabTwo = getByTitle('MOCK_FOLDER_PATH/MOCK_FILE_PATH_1.md')

    expect(tabOne).toBeInTheDocument()

    expect(tabTwo).toBeInTheDocument()

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await userEvent.click(tabOne.querySelector('svg')!)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await userEvent.click(tabTwo.querySelector('svg')!)
    })

    expect(tabOne).not.toBeInTheDocument()

    expect(tabTwo).not.toBeInTheDocument()
  })

  it('should remove tab when file is deleted from the sidebar', async () => {
    const { getByLabelText, getByText, getByTitle } = await render(
      <Dashboard />
    )

    await userEvent.click(getByText('MOCK_FILE_PATH_3.md'))

    const tabOne = getByTitle('MOCK_FILE_PATH_3.md')

    // open file menu
    await userEvent.click(getByLabelText('MOCK_FILE_PATH_3.md actions'))

    await userEvent.click(getByLabelText('Delete'))

    expect(tabOne).not.toBeInTheDocument()
  })

  it('should change name of tab when file is renamed from the sidebar', async () => {
    const { getByLabelText, getByText, getByTitle } = await render(
      <Dashboard />
    )

    await userEvent.click(getByText('MOCK_FILE_PATH_3.md'))

    const tabOne = getByTitle('MOCK_FILE_PATH_3.md')

    expect(tabOne).toBeInTheDocument()

    // open file menu
    await userEvent.click(getByLabelText('MOCK_FILE_PATH_3.md actions'))

    await userEvent.click(getByLabelText('Rename'))

    // Insert file name into input and submit
    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: 'NEW_MOCK_FILE_PATH' },
    })

    expect(input).toHaveAttribute('value', 'NEW_MOCK_FILE_PATH')

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(tabOne).not.toBeInTheDocument()

    expect(getByTitle('NEW_MOCK_FILE_PATH.md')).toBeInTheDocument()
  })
})
