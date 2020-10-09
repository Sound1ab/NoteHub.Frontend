import React from 'react'

import { folderNode, resolvers } from '../../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../../test-utils'
import { MockProvider } from '../../../../../../providers'
import { Folder } from './Folder'

describe('Folder', () => {
  const onToggle = jest.fn()

  const onClick = jest.fn()

  const activePath = 'MOCK_PATH'

  const childNodes = <div>MOCK CHILDREN</div>

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call onToggle with true if node is not already selected', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Folder
          node={folderNode}
          onToggle={onToggle}
          onClick={onClick}
          activePath={activePath}
          level={1}
          childNodes={childNodes}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('folder'))

    expect(onToggle).toBeCalledWith(folderNode.path, true)
  })

  it('should call onToggle with false if node is already selected', async () => {
    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentPath: folderNode.path }}
      >
        <Folder
          node={{ ...folderNode, toggled: true }}
          onToggle={onToggle}
          onClick={onClick}
          activePath={folderNode.path}
          level={1}
          childNodes={childNodes}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('folder'))

    expect(onToggle).toBeCalledWith(folderNode.path, false)
  })

  it('should call onToggle with false if chevron is clicked and node is not selected', async () => {
    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentPath: folderNode.path }}
      >
        <Folder
          node={{ ...folderNode, toggled: true }}
          onToggle={onToggle}
          onClick={onClick}
          activePath={activePath}
          level={1}
          childNodes={childNodes}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('chevron'))

    expect(onToggle).toBeCalledWith(folderNode.path, false)
  })

  it('should open folder dropdown menu', async () => {
    const { getByLabelText, getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Folder
          node={folderNode}
          onToggle={onToggle}
          onClick={onClick}
          activePath={activePath}
          level={1}
          childNodes={childNodes}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FOLDER actions'))

    expect(getByText('Create file')).toBeInTheDocument()
  })

  it('should open file input when create new file is selected from folder dropdown', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Folder
          node={folderNode}
          onToggle={onToggle}
          onClick={onClick}
          activePath={activePath}
          level={1}
          childNodes={childNodes}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FOLDER actions'))

    await fireEvent.click(getByLabelText('Create file'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })

  it('should call onClick if folder is clicked', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Folder
          node={folderNode}
          onToggle={onToggle}
          onClick={onClick}
          activePath={activePath}
          level={1}
          childNodes={childNodes}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('folder'))

    expect(onClick).toBeCalled()
  })
})
