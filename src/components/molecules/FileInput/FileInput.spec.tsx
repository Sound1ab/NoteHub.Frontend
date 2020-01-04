import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCreateFile } from '../../../hooks'
import { files, repos, resolvers, user } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { FileInput } from './FileInput'

jest.mock('../../../hooks/file/useCreateFile')

afterEach(cleanup)

describe('FileInput', () => {
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
  })

  it('should create a new file when user submits form', async () => {
    const [{ name }] = repos
    const [{ filename }] = files
    const { login } = user

    const createNewFile = jest.fn()
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      createNewFile,
      { loading: false },
    ])

    const newFileName = 'MOCK_FILE_NAME'

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <FileInput />
      </MockProvider>
    )

    const input = getByLabelText('Input file name')

    await fireEvent.change(input, {
      target: { value: newFileName },
    })

    expect(input).toHaveAttribute('value', newFileName)

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(createNewFile).toBeCalledWith({
      variables: {
        input: {
          content: `# ${newFileName}`,
          filename: `${newFileName}.md`,
          repo: name,
          username: login,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createFile: {
          __typename: 'File',
          filename: `${newFileName}.md`!,
          path: '',
          content: `# ${newFileName}`,
          excerpt: null,
          sha: 'optimistic',
          _links: {
            __typename: 'Links',
            html: '',
          },
          repo: '',
        },
      },
    })
  })

  it('should display an error message and close the input if there was a problem', async () => {
    const [{ name }] = repos
    const [{ filename }] = files

    const createNewFile = () => Promise.reject()
    ;(useCreateFile as jest.Mock).mockImplementation(() => [
      createNewFile,
      { loading: false },
    ])

    const newFileName = 'MOCK_FILE_NAME'

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: name, currentFileName: filename }}
      >
        <FileInput />
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
})
