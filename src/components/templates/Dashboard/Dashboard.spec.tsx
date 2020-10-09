import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fileGitNodeTwo, resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../providers'
import { Dashboard } from './Dashboard'

jest.mock('react-simplemde-editor', function () {
  return {
    __esModule: true,
    default({ value }: any) {
      return <div>{value}</div>
    },
  }
})
jest.mock('../../../utils/debounce', () => ({
  debounce: (fn: any) => (...args: any) => fn(...args),
}))
jest.mock('../../../utils/scrollIntoView')

afterEach(cleanup)

describe('Dashboard', () => {
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
      <MockProvider mockResolvers={resolvers} localData={{ currentPath: path }}>
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

    const image = `![](https://github.com/Sound1ab/NoteHub.Notebook/blob/master/__notehub__images__/${imageFilename}?raw=true)MOCK_CONTENT_2`

    expect(getByText(image)).toBeInTheDocument()
  })

  it('should show alert if deleting a file errors', async () => {
    const { path } = fileGitNodeTwo

    const alert = jest.fn()
    ;(global as any).alert = alert

    const { getByLabelText, getByText } = await render(
      <MockProvider
        localData={{ currentPath: path }}
        mockResolvers={{
          ...resolvers,
          Mutation: () => ({
            ...resolvers.Mutation(),
            deleteFile: (): File => {
              throw new Error()
            },
          }),
        }}
      >
        <Dashboard />
      </MockProvider>
    )

    // Open folder
    await fireEvent.click(getByText('MOCK_FOLDER_PATH'))

    // Open dropdown
    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    // Delete file
    await fireEvent.click(getByLabelText('Delete file'))

    expect(alert).toBeCalledWith('Could not delete file. Please try again.')
  })
})
