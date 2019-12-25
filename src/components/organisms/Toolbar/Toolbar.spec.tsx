import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { useCreateImage, useDeleteFile } from '../../../hooks'
import { act, cleanup, fireEvent, render } from '../../../test-utils'
import {
  MutationDeleteFileArgs,
  Repo,
} from '../../apollo/generated_components_typings'
import { MockProvider } from '../../utility'
import { Toolbar } from './Toolbar'

jest.mock('../../../hooks/file/useDeleteFile')
jest.mock('../../../hooks/image/useCreateImage')

afterEach(cleanup)

describe('Toolbar', () => {
  const deleteFile = jest.fn()
  const createImage = jest.fn()
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [deleteFile])
    ;(useCreateImage as jest.Mock).mockImplementation(() => [createImage])
    ;(global as any).alert = alert
  })

  const user = {
    id: 1,
    login: 'MOCK_LOGIN',
    avatar_url: 'MOCK_AVATAR_URL',
    html_url: 'MOCK_HTML_URL',
    name: 'MOCK_NAME',
  }

  const repos = [
    {
      description: 'MOCK_DESCRIPTION_2',
      full_name: 'MOCK_FULL_NAME_2',
      id: 2,
      name: 'MOCK_NAME_2',
      node_id: 'MOCK_ID_2',
      private: false,
    },
    {
      description: 'MOCK_DESCRIPTION_1',
      full_name: 'MOCK_FULL_NAME_1',
      id: 1,
      name: 'MOCK_NAME_1',
      node_id: 'MOCK_ID_1',
      private: true,
    },
  ]
  const files = [
    {
      filename: 'MOCK_FILENAME_2',
      path: 'MOCK_PATH_2',
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      _links: {
        html: 'MOCK_HTML_LINK_2',
      },
    },
    {
      filename: 'MOCK_FILENAME_1',
      path: 'MOCK_PATH_1',
      content: 'MOCK_CONTENT_1',
      excerpt: 'MOCK_EXCERPT_1',
      sha: 'MOCK_SHA_1',
      _links: {
        html: 'MOCK_HTML_LINK_1',
      },
    },
  ]
  const resolvers = {
    Query: () => ({
      listRepos: () => ({
        items: repos,
      }),
      listFiles: () => ({
        items: files,
      }),
    }),
    Mutation: () => ({
      deleteFile: (_, { input }: MutationDeleteFileArgs): Repo => ({
        id: 3,
        node_id: 'MOCK_NODE_ID',
        name: input.filename,
        full_name: 'MOCK_FULL_NAME',
        description: 'MOCK_DESCRIPTION',
        private: false,
      }),
    }),
    GithubUser: () => user,
  }

  it('should disable create file button if there is no repo selected and open file modal when create file button is clicked', async () => {
    const [{ name }] = repos

    const { getByLabelText, queryByTitle, rerender } = render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Toolbar>{() => <div>children</div>}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByLabelText('Create a new file'))

    expect(queryByTitle('Create new File')).toBeNull()

    rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: null }}
      >
        <Toolbar>{() => <div>children</div>}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByLabelText('Create a new file'))

    expect(queryByTitle('Create new File')).toBeDefined()
  })

  it('should disabled delete file button if there is no repo or file selected and delete file if delete file button is clicked', async () => {
    const [{ name }] = repos
    const [{ filename }] = files
    const { login } = user

    const { getByLabelText, rerender } = render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: null, currentFileName: null }}
      >
        <Toolbar>{() => <div>children</div>}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByLabelText('Delete the selected file'))

    expect(deleteFile).not.toBeCalled()

    rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: null }}
      >
        <Toolbar>{() => <div>children</div>}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByLabelText('Delete the selected file'))

    expect(deleteFile).not.toBeCalled()

    rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar>{() => <div>children</div>}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    await act(async () => {
      fireEvent.click(getByLabelText('Delete the selected file'))
    })

    expect(deleteFile).toBeCalledWith({
      variables: {
        input: {
          filename,
          repo: name,
          username: login,
        },
      },
    })
  })

  it('should display alert if there was a problem deleting file', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const deleteFile = () => Promise.reject()
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [deleteFile])

    const { getByLabelText } = render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar>{() => <div>children</div>}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByLabelText('Delete the selected file'))

    await act(() => wait(0))

    expect(alert).toBeCalledWith(
      'There was an issue deleting your file, please try again'
    )
  })

  it('should pass isEdit value to children', async () => {
    const [{ name }] = repos
    const [{ filename }] = files
    const children = jest.fn(() => <div>children</div>)

    const { getByLabelText } = render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar>{children}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    expect(children).toBeCalledWith({
      isEdit: true,
      isImageUploading: false,
      ref: { current: null },
    })

    fireEvent.click(getByLabelText('View file in preview'))

    expect(children).toBeCalledWith({
      isEdit: false,
      isImageUploading: false,
      ref: { current: null },
    })
  })

  it.skip('should upload an image when image upload button is clicked', async () => {
    const [{ name }] = repos
    const [{ filename }] = files
    const children = jest.fn(() => <div>children</div>)

    const { getByLabelText } = render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <Toolbar>{children}</Toolbar>
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByLabelText('Upload an image'))
  })

  // it('should pass isImageUploading value to children', () => {})
})
