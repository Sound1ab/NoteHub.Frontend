import { screen } from '@testing-library/react'
import React from 'react'

import { render } from '../../../../../test-utils'
import {
  clickAndDragFileOverFolder,
  clickChevron,
  clickContainer,
  clickDropdownItem,
  clickNode,
  openDropdown,
  typeInInputAndSubmit,
} from '../../../../../utils/testing/userActions'
import { FileTree } from './FileTree'

jest.mock('../../../../../utils/scrollIntoView')

jest.setTimeout(10000)

describe('FileTree', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should toggle folders', async () => {
    await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

    await clickNode('MOCK_FOLDER_PATH')

    expect(screen.getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()

    await clickNode('MOCK_FOLDER_PATH')

    expect(screen.queryByText('MOCK_FILE_PATH_2.md')).not.toBeInTheDocument()

    await clickNode('MOCK_FOLDER_PATH')

    expect(screen.getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()
  })

  describe('file input', () => {
    it('should show file input if passed prop', async () => {
      await render(<FileTree isNewFileOpen={true} closeNewFile={jest.fn()} />)

      expect(screen.getByLabelText('Input file name')).toBeInTheDocument()
    })

    it('should call closeNewFile if deselected ', async () => {
      const closeNewFile = jest.fn()

      const { container } = await render(
        <FileTree isNewFileOpen={true} closeNewFile={closeNewFile} />
      )

      await clickContainer(container)

      expect(closeNewFile).toBeCalled()
    })
  })

  describe('when creating a file', () => {
    it('should toggle folder open if placed inside a closed folder', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      await openDropdown('MOCK_FOLDER_PATH')

      await clickDropdownItem('Create file')

      await typeInInputAndSubmit(
        'Input file name',
        'File name form',
        'MOCK_FOLDER_PATH/NEW_MOCK_FILE_NAME'
      )

      await expect(
        screen.getByText('NEW_MOCK_FILE_NAME.md')
      ).toBeInTheDocument()
    })

    it('should toggle nested folder open if placed inside a closed folder', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      await openDropdown('MOCK_FOLDER_PATH')

      await clickDropdownItem('Create file')

      await typeInInputAndSubmit(
        'Input file name',
        'File name form',
        'MOCK_FOLDER_PATH/MOCK_FOLDER_PATH_2/MOCK_FOLDER_PATH_3/NEW_MOCK_FILE_NAME_5'
      )

      expect(screen.getByText('NEW_MOCK_FILE_NAME_5.md')).toBeInTheDocument()
    })

    it('should be possible to toggle newly created folder', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      await openDropdown('MOCK_FOLDER_PATH')

      await clickDropdownItem('Create file')

      await typeInInputAndSubmit(
        'Input file name',
        'File name form',
        'MOCK_FOLDER_PATH_OTHER/NEW_MOCK_FILE_NAME'
      )

      expect(screen.getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()

      await clickNode('MOCK_FOLDER_PATH_OTHER')

      expect(screen.getByText('NEW_MOCK_FILE_NAME.md')).toBeInTheDocument()

      await clickNode('MOCK_FOLDER_PATH_OTHER')

      expect(
        screen.queryByText('NEW_MOCK_FILE_NAME.md')
      ).not.toBeInTheDocument()
    })
  })

  describe('when deleting a file', () => {
    it('should remove file but keep folder open if other files exist', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      await clickNode('MOCK_FOLDER_PATH')

      expect(screen.getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      await openDropdown('MOCK_FILE_PATH_1.md')

      await clickDropdownItem('Delete')

      expect(screen.queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      expect(screen.getByText('MOCK_FILE_PATH_2.md')).toBeInTheDocument()
    })

    it('should remove folder if no other files exist', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      await clickNode('MOCK_FOLDER_PATH')

      expect(screen.getByText('MOCK_FOLDER_PATH')).toBeInTheDocument()

      await openDropdown('MOCK_FILE_PATH_1.md')

      await clickDropdownItem('Delete')

      await openDropdown('MOCK_FILE_PATH_2.md')

      await clickDropdownItem('Delete')

      await openDropdown('MOCK_FILE_PATH_4.md')

      await clickDropdownItem('Delete')

      expect(screen.queryByText('MOCK_FOLDER_PATH')).not.toBeInTheDocument()
    })
  })

  describe('when renaming a file or folder', () => {
    it('should move the file or folder to a new name', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      await clickNode('MOCK_FOLDER_PATH')

      expect(screen.getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      await openDropdown('MOCK_FILE_PATH_1.md')

      await clickDropdownItem('Rename')

      await typeInInputAndSubmit(
        'Input file name',
        'File name form',
        'NEW_MOCK_FILE_PATH'
      )

      expect(screen.queryByText('MOCK_FILE_PATH_1.md')).not.toBeInTheDocument()

      expect(screen.getByText('NEW_MOCK_FILE_PATH.md')).toBeInTheDocument()
    })
  })

  describe('when dragging a file', () => {
    it('should place file into folder', async () => {
      await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

      expect(screen.getByText('MOCK_FILE_PATH_3.md')).toBeInTheDocument()

      await clickAndDragFileOverFolder(
        'MOCK_FILE_PATH_3.md',
        'MOCK_FOLDER_PATH'
      )

      expect(screen.getByText('MOCK_FILE_PATH_1.md')).toBeInTheDocument()

      // Close the folder so we can test it's placement
      await clickChevron()

      expect(screen.queryByText('MOCK_FILE_PATH_3.md')).not.toBeInTheDocument()
    })
  })
})
