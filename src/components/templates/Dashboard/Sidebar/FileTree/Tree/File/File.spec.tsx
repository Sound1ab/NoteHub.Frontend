import React from 'react'

import {
  useDeleteFile,
  useFileTree,
  useReadFile,
} from '../../../../../../../hooks'
import { useMoveFile } from '../../../../../../../hooks/file/useMoveFile'
import { files, resolvers } from '../../../../../../../schema/mockResolvers'
import { fireEvent, render, waitFor } from '../../../../../../../test-utils'
import { createNodes } from '../../../../../../../utils'
import { Node_Type } from '../../../../../../apollo'
import { MockProvider } from '../../../../../../providers'
import { localState } from '../../../../../../providers/ApolloProvider/cache'
import { File } from './File'

jest.mock('../../../../../../../hooks/utils/useFileTree')
jest.mock('../../../../../../../hooks/file/useDeleteFile')
jest.mock('../../../../../../../hooks/file/useMoveFile')
jest.mock('../../../../../../../hooks/file/useReadFile')

describe('File', () => {
  const onClick = jest.fn()

  const deleteFile = jest.fn()

  const moveFile = jest.fn()

  const openFoldersInPath = jest.fn()

  const activePath = 'MOCK_ACTIVE_PATH'

  const currentPathVar = jest.spyOn(localState, 'currentPathVar')

  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [
      deleteFile,
      { error: undefined },
    ])
    ;(useFileTree as jest.Mock).mockReturnValue({
      activePath,
      onClick,
      openFoldersInPath,
    })
    ;(useMoveFile as jest.Mock).mockReturnValue([
      moveFile,
      { error: undefined },
    ])
    ;(useReadFile as jest.Mock).mockReturnValue({
      file: files[0],
      error: undefined,
    })
  })

  afterEach(() => {
    currentPathVar.mockRestore()
  })

  it('should update the currentPath with clicked node path', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <File node={fileNode} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByText(fileNode.name))

    expect(currentPathVar).toBeCalledWith(fileNode.path)
  })

  it('should call onClick with path', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <File node={fileNode} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByText(fileNode.name))

    expect(onClick).toBeCalledWith(fileNode.path)
  })

  it('should show and hide inline file input when renaming file', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <div aria-label="outside">
          <File node={fileNode} level={1} />
        </div>
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Rename'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })

  it('should insert file name into inline file input when renaming file', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <div aria-label="outside">
          <File node={fileNode} level={1} />
        </div>
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Rename'))

    const input = getByLabelText('Input file name')

    expect((input as HTMLInputElement).value).toEqual('MOCK_FILE_PATH_3')
  })

  it('should call move file when renaming file', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <div aria-label="outside">
          <File node={fileNode} level={1} />
        </div>
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Rename'))

    const input = getByLabelText('Input file name')

    expect((input as HTMLInputElement).value).toEqual('MOCK_FILE_PATH_3')

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    expect(moveFile).toBeCalledWith(fileNode, 'MOCK_FILE_PATH_3.md')
  })

  it('should show alert if deleteFile returns an error', async () => {
    ;(useMoveFile as jest.Mock).mockImplementation(() => [
      async () => Promise.reject('mock error'),
      { loading: false },
    ])

    const { getByLabelText, getByText } = await render(
      <MockProvider>
        <File node={fileNode} level={1} />
      </MockProvider>,
      { enableToast: true }
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Rename'))

    const input = getByLabelText('Input file name')

    expect((input as HTMLInputElement).value).toEqual('MOCK_FILE_PATH_3')

    const form = getByLabelText('File name form')

    await fireEvent.submit(form)

    await waitFor(() =>
      expect(getByText('Could not move file')).toBeInTheDocument()
    )
  })

  it('should open file dropdown menu', async () => {
    const { getByLabelText, getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <File node={fileNode} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    expect(getByText('Delete file')).toBeInTheDocument()
  })

  it('should call deleteFile when selected from file dropdown', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <File node={fileNode} level={1} />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Delete file'))

    expect(deleteFile).toBeCalled()
  })

  it('should show alert if deleteFile returns an error', async () => {
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [
      async () => Promise.reject('mock error'),
    ])

    const { getByLabelText, getByText } = await render(
      <MockProvider>
        <File node={fileNode} level={1} />
      </MockProvider>,
      { enableToast: true }
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Delete file'))

    await waitFor(() =>
      expect(
        getByText('There was an issue deleting your file. mock error')
      ).toBeInTheDocument()
    )
  })
})
