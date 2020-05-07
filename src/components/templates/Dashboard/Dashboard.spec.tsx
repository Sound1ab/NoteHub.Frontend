import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateFile } from '../../../hooks'
import {
  fileGitNodeOne,
  fileGitNodeTwo,
  folderNode,
  resolvers,
} from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { FileInput } from '../../molecules'
import { MockProvider } from '../../utility'
import { Dashboard } from './Dashboard'

jest.mock('react-simplemde-editor', function() {
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
    const { getByText, getByLabelText, getAllByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Dashboard />
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

  it.skip('should display an error message and close the file input if there was a problem', async () => {
    const createNewFile = () => Promise.reject()
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      createNewFile,
      { loading: false },
    ])

    const newFileName = 'MOCK_FILE_NAME'
    const path = folderNode.path

    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <FileInput path={path} onClickOutside={jest.fn()} />
      </MockProvider>
    )

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: newFileName },
    })

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(alert).toBeCalledWith(
      'There was an issue creating your file, please try again'
    )
  })

  it.skip('should delete file if repo and file is selected', async () => {})

  it('should toggle between edit and preview mode', async () => {
    const { path } = fileGitNodeOne

    const { getByLabelText, getByTitle } = await render(
      <MockProvider mockResolvers={resolvers} localData={{ currentPath: path }}>
        <Dashboard />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()

    await fireEvent.click(getByTitle('View file in preview'))

    expect(getByLabelText('Markdown preview')).toBeDefined()
  })

  it.skip('should insert uploaded image at cursor position', async () => {
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

    const image = `![](https://github.com/Sound1ab/NoteHub.Notebook.${name}/blob/master/images/${imageFilename}?raw=true)`

    expect(getByText(image)).toBeInTheDocument()
  })
})
