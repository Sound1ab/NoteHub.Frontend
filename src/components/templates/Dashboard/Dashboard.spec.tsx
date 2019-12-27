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

  it.skip('should add file if repo is selected', async () => {
    const [{ name }] = repos

    const { getByText, getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Dashboard />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Create a new file'))

    expect(getByLabelText('Add new file name')).not.toBeDefined()

    await fireEvent.click(getByText(name))

    await fireEvent.click(getByLabelText('Create a new file'))

    expect(getByLabelText('Add new file name')).toBeDefined()
  })

  it('should delete file if repo and file is selected', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByText, getByLabelText, queryByText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Dashboard />
      </MockProvider>
    )

    await fireEvent.click(getByText(name))

    await fireEvent.click(getByText(filename))

    await fireEvent.click(getByLabelText('Delete the selected file'))

    expect(queryByText(filename)).toBeNull()
  })

  it('should toggle between edit and preview mode', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Dashboard />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()

    await fireEvent.click(getByLabelText('View file in preview'))

    expect(getByLabelText('Markdown preview')).toBeDefined()
  })

  it('should insert uploaded image at cursor position', async () => {
    const { login } = user
    const [{ name }] = repos
    const [{ filename, content }] = files

    const { getByLabelText, getByText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Dashboard />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Upload an image'))

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
