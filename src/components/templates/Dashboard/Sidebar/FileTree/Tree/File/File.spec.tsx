import React from 'react'

import { useFileTree } from '../../../../../../../hooks/context/useFileTree'
import { files, resolvers } from '../../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../../test-utils'
import { createNodes } from '../../../../../../../utils/createNodes'
import { Node_Type } from '../../../../../../apollo/generated_components_typings'
import { MockProvider } from '../../../../../../providers/ApolloProvider/MockProvider'
import { File } from './File'

jest.mock('../../../../../../../hooks/context/useFileTree')

describe('File', () => {
  const onFileClick = jest.fn()

  const onDeleteFile = jest.fn()

  const onRename = jest.fn()

  const activePath = 'MOCK_ACTIVE_PATH'

  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useFileTree as jest.Mock).mockReturnValue({
      activePath,
      onFileClick,
      onDeleteFile,
      onRename,
      loading: false,
    })
  })

  it('should call onFileClick with type and path', async () => {
    const { getByText } = await render(<File node={fileNode} level={1} />)

    await fireEvent.click(getByText(fileNode.name))

    expect(onFileClick).toBeCalledWith(Node_Type.File, fileNode.path)
  })

  it('should show and hide inline file input when renaming file', async () => {
    const { getByLabelText } = await render(
      <div aria-label="outside">
        <File node={fileNode} level={1} />
      </div>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Rename'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })

  it('should insert file name into inline file input when renaming file', async () => {
    const { getByLabelText } = await render(
      <div aria-label="outside">
        <File node={fileNode} level={1} />
      </div>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Rename'))

    const input = getByLabelText('Input file name')

    expect((input as HTMLInputElement).value).toEqual('MOCK_FILE_PATH_3')
  })

  it('should call onRename when renaming file', async () => {
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

    expect(onRename).toBeCalledWith(fileNode, 'MOCK_FILE_PATH_3')
  })

  it('should open file dropdown menu', async () => {
    const { getByLabelText, getByText } = await render(
      <File node={fileNode} level={1} />
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    expect(getByText('Delete')).toBeInTheDocument()
  })

  it('should call onDeleteFile when selected from file dropdown', async () => {
    const { getByLabelText } = await render(<File node={fileNode} level={1} />)

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    await fireEvent.click(getByLabelText('Delete'))

    expect(onDeleteFile).toBeCalled()
  })
})
