import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { files, repos, resolvers, user } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
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
jest.mock('../../../utils', () => ({
  debounce: (fn: any) => (...args: any) => fn(...args),
}))

afterEach(cleanup)

describe('Dashboard', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should add repos', async () => {
    const newRepoName = 'MOCK_REPO_NAME'

    const { getByText, getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Dashboard />
      </MockProvider>
    )

    await fireEvent.click(getByText('New Repo'))

    const input = getByLabelText('Repo name')

    await fireEvent.change(input, {
      target: { value: newRepoName },
    })

    const form = getByLabelText('Repo name')

    await fireEvent.submit(form)

    expect(getByText(newRepoName)).toBeDefined()
  })

  it('should add file if repo is selected', async () => {
    const [{ name }] = repos
    const newFileName = 'MOCK_FILE_NAME'

    const {
      getByText,
      getByLabelText,
      queryByLabelText,
      getByTitle,
    } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Dashboard />
      </MockProvider>
    )

    expect(queryByLabelText('Input file name')).toBeNull()

    await fireEvent.click(getByText(name))

    await fireEvent.click(getByTitle('Create a new file'))

    await fireEvent.change(getByLabelText('Input file name'), {
      target: { value: newFileName },
    })

    await fireEvent.submit(getByLabelText('File name form'))

    expect(getByText(newFileName)).toBeDefined()
  })

  it('should delete file if repo and file is selected', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByText, queryByText, getByTitle } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Dashboard />
      </MockProvider>
    )

    await fireEvent.click(getByText(name))

    await fireEvent.click(getByText(filename))

    await fireEvent.click(getByTitle('Delete the selected file'))

    expect(queryByText(filename)).toBeNull()
  })

  it('should toggle between edit and preview mode', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText, getByTitle } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Dashboard />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()

    await fireEvent.click(getByTitle('View file in preview'))

    expect(getByLabelText('Markdown preview')).toBeDefined()
  })

  it('should insert uploaded image at cursor position', async () => {
    const { login } = user
    const [{ name }] = repos
    const [{ filename, content }] = files

    const { getByLabelText, getByText, getByTitle } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
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

    const image = `![](https://github.com/${login}/noted-app-notes--${name}/blob/master/images/${imageFilename}?raw=true)${content}`

    expect(getByText(image)).toBeDefined()
  })
})
