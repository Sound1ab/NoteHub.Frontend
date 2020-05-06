import React from 'react'

import { useDeleteFile } from '../../../hooks'
import { fileNode, folderNode, resolvers } from '../../../schema/mockResolvers'
import { fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { NodeItem } from './NodeItem'

jest.mock('../../../hooks/file/useDeleteFile')

describe('NodeItem', () => {
  const onToggle = jest.fn()

  const openFileInput = jest.fn()

  const deleteFile = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [deleteFile])
  })

  describe('when a folder', () => {
    it('should call onToggle with true if node is not already selected', async () => {
      const { getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={folderNode}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('folder'))

      expect(onToggle).toBeCalledWith(folderNode, true)
    })

    it('should call onToggle with false if node is already selected', async () => {
      const { getByLabelText } = await render(
        <MockProvider
          mockResolvers={resolvers}
          localData={{ currentPath: folderNode.path }}
        >
          <NodeItem
            node={{ ...folderNode, toggled: true }}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('folder'))

      expect(onToggle).toBeCalledWith({ ...folderNode, toggled: true }, false)
    })

    it('should open folder dropdown menu', async () => {
      const { getByLabelText, getByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={folderNode}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('item menu'))

      expect(getByText('Create file')).toBeInTheDocument()
    })

    it('should call openFileInput when create new file is selected from folder dropdown', async () => {
      const { getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={folderNode}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('item menu'))

      await fireEvent.click(getByLabelText('Create file'))

      expect(openFileInput).toBeCalled()
    })
  })

  describe('when a file', () => {
    it('should open file dropdown menu', async () => {
      const { getByLabelText, getByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={fileNode}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('item menu'))

      expect(getByText('Delete file')).toBeInTheDocument()
    })

    it('should call deleteFile when selected from file dropdown', async () => {
      const { getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={fileNode}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('item menu'))

      await fireEvent.click(getByLabelText('Delete file'))

      expect(deleteFile).toBeCalled()
    })
  })
})
