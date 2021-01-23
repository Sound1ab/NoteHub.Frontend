import { screen } from '@testing-library/react'
import React from 'react'

import * as useFileTree from '../../../../../hooks/fileTree/useFileTree'
import * as useFs from '../../../../../hooks/fs/useFs'
import * as useGit from '../../../../../hooks/git/useGit'
import * as useFiles from '../../../../../hooks/recoil/useFiles'
import { render } from '../../../../../test-utils'
import { spyOn } from '../../../../../utils/testing/spyOn'
import {
  clickContainer,
  typeInInputAndSubmit,
} from '../../../../../utils/testing/userActions'
import { Node_Type } from '../../../../apollo/generated_components_typings'
import { FileTree } from './FileTree'

jest.mock('../../../../../utils/scrollIntoView')
jest.mock('../../../../../hooks/git/useGit')
jest.mock('../../../../../hooks/fs/useFs')
jest.mock('../../../../../hooks/recoil/useFiles')
jest.mock('../../../../../hooks/fileTree/useFileTree')

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
    spyOn(useGit, 'useGit', () => [{ clone }, { loading: false }])
    spyOn(useFs, 'useFs', () => [
      {
        readDirRecursive: () => [file],
      },
      { loading: false },
    ])
    spyOn(useFiles, 'useFiles', () => [[], setFiles])
    spyOn(useFileTree, 'useFileTree', () => [{ createFile }])
  })

  it('should call clone repo and setFiles on load', async () => {
    await render(<FileTree isNewFileOpen={false} closeNewFile={jest.fn()} />)

    expect(clone).toBeCalledTimes(2)
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
