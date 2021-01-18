import { screen } from '@testing-library/react'
import React from 'react'

import { useFileTree } from '../../../../../../../hooks/fileTree/useFileTree'
import { fireEvent, render } from '../../../../../../../test-utils'
import { IFolderNode } from '../../../../../../../types'
import { getMockNodes } from '../../../../../../../utils/testing/getMockNodes'
import {
  clickDropdownItem,
  openDropdown,
  typeInInputAndSubmit,
} from '../../../../../../../utils/testing/userActions'
import { Folder } from './Folder'

jest.mock('../../../../../../../hooks/fileTree/useFileTree', () => ({
  useFileTree: jest.fn(),
}))

describe('Folder', () => {
  const childNodes = <div>MOCK CHILDREN</div>
  const { folderNode } = getMockNodes()

  const folderClick = jest.fn()
  const chevronClick = jest.fn()
  const createFile = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useFileTree as jest.Mock).mockReturnValue([
      {
        openFoldersInPath: jest.fn(),
        toggleFolder: jest.fn(),
        deleteFile: jest.fn(),
        renameNode: jest.fn(),
        fileClick: jest.fn(),
        createFile,
        folderClick,
        chevronClick,
      },
      { loading: false, error: null },
    ])
  })

  it('should call folderClick with path', async () => {
    await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await fireEvent.click(screen.getByLabelText('folder'))

    expect(folderClick).toBeCalledWith(folderNode.path, false)
  })

  it('should call chevronClick if chevron is clicked', async () => {
    await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await fireEvent.click(screen.getByLabelText('chevron'))

    expect(chevronClick).toBeCalledWith(folderNode.path, false)
  })

  it('should call handleCreate after inputting new file name', async () => {
    await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await openDropdown('MOCK_FOLDER_PATH')

    await clickDropdownItem({ item: 'Create file' })

    await typeInInputAndSubmit(
      'Input file name',
      'File name form',
      'MOCK_FOLDER_PATH/NEW_MOCK_FILE_NAME'
    )

    await expect(createFile).toBeCalledWith(
      'MOCK_FOLDER_PATH/MOCK_FOLDER_PATH/NEW_MOCK_FILE_NAME.md'
    )
  })

  it('should open folder dropdown menu', async () => {
    await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await openDropdown(folderNode.name)

    await clickDropdownItem({ item: 'Create file' })

    expect(screen.getByLabelText('Input file name')).toBeInTheDocument()
  })

  // TODO: Complete tests
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('should add styles in drag and drop is over folder', async () => {})

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  it('should call handleMove after drag and drop is dropped', async () => {})
})
