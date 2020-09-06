import React from 'react'

import { useDeleteFile } from '../../../hooks'
import {
  fileNodeOne,
  folderNode,
  resolvers,
} from '../../../schema/mockResolvers'
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
    ;(useDeleteFile as jest.Mock).mockImplementation(() => [
      deleteFile,
      { error: undefined },
    ])
  })

  it('should show and hide inline file input when renaming file or folder', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <div aria-label="outside">
          <NodeItem
            node={fileNodeOne}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </div>
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    await fireEvent.click(getByLabelText('Rename'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
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

      expect(onToggle).toBeCalledWith(folderNode.path, true)
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

      expect(onToggle).toBeCalledWith(folderNode.path, false)
    })

    it('should call onToggle with false if chevron is clicked and node is not selected', async () => {
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

      await fireEvent.click(getByLabelText('chevron'))

      expect(onToggle).toBeCalledWith(folderNode.path, false)
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

      await fireEvent.click(getByLabelText('MOCK_FOLDER actions'))

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

      await fireEvent.click(getByLabelText('MOCK_FOLDER actions'))

      await fireEvent.click(getByLabelText('Create file'))

      expect(openFileInput).toBeCalled()
    })
  })

  describe('when a file', () => {
    it('should open file dropdown menu', async () => {
      const { getByLabelText, getByText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={fileNodeOne}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

      expect(getByText('Delete file')).toBeInTheDocument()
    })

    it('should call deleteFile when selected from file dropdown', async () => {
      const { getByLabelText } = await render(
        <MockProvider mockResolvers={resolvers}>
          <NodeItem
            node={fileNodeOne}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

      await fireEvent.click(getByLabelText('Delete file'))

      expect(deleteFile).toBeCalled()
    })

    it('should show alert if deleteFile returns an error', async () => {
      ;(useDeleteFile as jest.Mock).mockImplementation(() => [
        async () => Promise.reject(),
      ])

      const alert = jest.fn()
      ;(global as any).alert = alert

      const { getByLabelText } = await render(
        <MockProvider>
          <NodeItem
            node={fileNodeOne}
            onToggle={onToggle}
            openFileInput={openFileInput}
            level={1}
          />
        </MockProvider>
      )

      await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

      await fireEvent.click(getByLabelText('Delete file'))

      expect(alert).toBeCalledWith('Could not delete file. Please try again.')
    })
  })
})
