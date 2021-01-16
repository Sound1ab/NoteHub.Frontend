import { screen } from '@testing-library/react'
import React from 'react'

import { useFileTree } from '../../../../../hooks/fileTree/useFileTree'
import { useFs } from '../../../../../hooks/fs/useFs'
import { useGit } from '../../../../../hooks/git/useGit'
import { useFiles } from '../../../../../hooks/recoil/useFiles'
import { render } from '../../../../../test-utils'
import {
  clickContainer,
  typeInInputAndSubmit,
} from '../../../../../utils/testing/userActions'
import { Node_Type } from '../../../../apollo/generated_components_typings'
import { FileTree } from './FileTree'

jest.mock('../../../../../utils/scrollIntoView')
jest.mock('../../../../../hooks/git/useGit', () => ({
  useGit: jest.fn(),
}))
jest.mock('../../../../../hooks/fs/useFs', () => ({
  useFs: jest.fn(),
}))
jest.mock('../../../../../hooks/recoil/useFiles', () => ({
  useFiles: jest.fn(),
}))
jest.mock('../../../../../hooks/fileTree/useFileTree', () => ({
  useFileTree: jest.fn(),
}))

jest.setTimeout(10000)

describe('FileTree', () => {
  const clone = jest.fn()
  const setFiles = jest.fn()
  const file = {
    path: 'MOCK_FILE_PATH.md',
    type: Node_Type.File,
    isOptimistic: false,
  }
  const createFile = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useGit as jest.Mock).mockReturnValue([{ clone }, { loading: false }])
    ;(useFs as jest.Mock).mockReturnValue([
      {
        readDirRecursive: () => [file],
      },
      { loading: false },
    ])
    ;(useFiles as jest.Mock).mockReturnValue([[], setFiles])
    ;(useFileTree as jest.Mock).mockReturnValue([{ createFile }])
  })

  it('should call clone repo and setFiles on load', async () => {
    await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

    expect(clone).toBeCalledTimes(1)
    expect(setFiles).toBeCalledWith([file])
  })

  it('should call createFile when creating a new file', async () => {
    await render(<FileTree isNewFileOpen={true} closeNewFile={jest.fn()} />)

    await typeInInputAndSubmit('Input file name', 'File name form', 'NEW_FILE')

    expect(createFile).toBeCalledWith('NEW_FILE.md')
  })

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
