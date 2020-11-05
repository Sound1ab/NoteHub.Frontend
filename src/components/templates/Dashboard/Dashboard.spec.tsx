import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fileGitNodeTwo, resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render, waitFor } from '../../../test-utils'
import { MockProvider } from '../../providers'
import { localState } from '../../providers/ApolloProvider/cache'
import { Dashboard } from './Dashboard'

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

afterEach(cleanup)

describe('Dashboard', () => {
  // This is an implementation detail inside codemirror.js
  // This may break if codemirror changes. Nulling createRange so
  // codemirror picks up createTextRange to place in their function 'range'
  // @ts-ignore
  global.document.createRange = null
  // @ts-ignore
  global.document.body.createTextRange = () => {
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

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should add folder and file', async () => {
    const { getByText, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Dashboard />
      </MockProvider>
    )

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
    const { path } = fileGitNodeTwo

    const { getByLabelText, getByText, getByTitle } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () => localState.currentPathVar(path),
        }}
      >
        <Dashboard />
      </MockProvider>
    )

    await fireEvent.click(getByTitle('Upload an image'))

    const imageFilename = 'chucknorris.png'

    const file = new File(['(⌐□_□)'], imageFilename, {
      type: 'image/png',
    })

    await fireEvent.change(getByLabelText('Upload file'), {
      target: { files: [file] },
    })

    expect(getByText('MOCK_IMAGE_PATH')).toBeInTheDocument()
  })

  it('should show alert if deleting a file errors', async () => {
    const { path } = fileGitNodeTwo

    const { getByLabelText, getByText } = await render(
      <MockProvider
        localData={{
          currentPath: () => localState.currentPathVar(path),
        }}
        mockResolvers={{
          ...resolvers,
          Mutation: () => ({
            ...resolvers.Mutation(),
            deleteFile: (): File => {
              throw new Error('mock error')
            },
          }),
        }}
      >
        <Dashboard />
      </MockProvider>,
      { enableToast: true }
    )

    // Open folder
    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    // Open dropdown
    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

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
})
