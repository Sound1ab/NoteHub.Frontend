import { screen } from '@testing-library/react'
import React from 'react'

import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { fireEvent, render } from '../../../../../../../test-utils'
import { getMockNodes } from '../../../../../../../utils/testing/getMockNodes'
import {
  clickDropdownItem,
  openDropdown,
  typeInInputAndSubmit,
} from '../../../../../../../utils/testing/userActions'
import { File } from './File'

jest.mock('../../../../../../../hooks/fileTree/useFileTree', () => ({
  useFileTree: jest.fn(),
}))

describe('File', () => {
  const fileClick = jest.fn()
  const deleteFile = jest.fn()
  const renameNode = jest.fn()

  const { fileNode } = getMockNodes()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useFileTree as jest.Mock).mockReturnValue([
      {
        openFoldersInPath: jest.fn(),
        toggleFolder: jest.fn(),
        deleteFile,
        renameNode,
        fileClick,
        createFile: jest.fn(),
        folderClick: jest.fn(),
        chevronClick: jest.fn(),
      },
      { loading: false, error: null },
    ])
  })

  it('should call fileClick path', async () => {
    await render(<File node={fileNode} level={1} />)

    await fireEvent.click(screen.getByText(fileNode.name))

    expect(fileClick).toBeCalledWith(fileNode.path)
  })

  it('should insert file name into inline file input when renaming file', async () => {
    await render(
      <div aria-label="outside">
        <File node={fileNode} level={1} />
      </div>
    )

    await openDropdown(fileNode.name)

    await clickDropdownItem({ item: 'Rename' })

    expect(
      (screen.getByLabelText('Input file name') as HTMLInputElement).value
    ).toEqual('MOCK_FILE_PATH_3')
  })

  it('should call renameNode when renaming file', async () => {
    await render(
      <div aria-label="outside">
        <File node={fileNode} level={1} />
      </div>
    )

    await openDropdown(fileNode.name)

    await clickDropdownItem({ item: 'Rename' })

    await typeInInputAndSubmit(
      'Input file name',
      'File name form',
      'NEW_MOCK_FILE_PATH_3'
    )

    expect(renameNode).toBeCalledWith(fileNode.path, 'NEW_MOCK_FILE_PATH_3.md')
  })

  it('should call deleteFile when selected from file dropdown', async () => {
    await render(<File node={fileNode} level={1} />)

    await openDropdown(fileNode.name)

    await clickDropdownItem({ item: 'Delete' })

    expect(deleteFile).toBeCalledWith(fileNode.path)
  })

  // TODO: Complete tests
  it('should add styles when being drag and dropped dragged', async () => {})
})
