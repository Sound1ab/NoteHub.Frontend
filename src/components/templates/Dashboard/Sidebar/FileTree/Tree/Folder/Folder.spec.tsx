import React from 'react'

import { useFileTree } from '../../../../../../../hooks'
import { files } from '../../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../../test-utils'
import { createNodes } from '../../../../../../../utils'
import { Node_Type } from '../../../../../../apollo'
import { Folder } from './Folder'
import { IFolderNode } from '../../../../../../../types'

jest.mock('../../../../../../../hooks/context/useFileTree')

describe('Folder', () => {
  const onToggle = jest.fn()

  const onClick = jest.fn()

  const onCreate = jest.fn()

  const onMove = jest.fn()

  const onChevronClick = jest.fn()

  const onFolderClick = jest.fn()

  const activePath = 'MOCK_PATH'

  const childNodes = <div>MOCK CHILDREN</div>

  const nodes = createNodes(files, new Set())

  const [folderNode] = nodes.filter((node) => node.type === Node_Type.Folder)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useFileTree as jest.Mock).mockReturnValue({
      activePath,
      onClick,
      onToggle,
      onCreate,
      onMove,
      onChevronClick,
      onFolderClick,
    })
  })

  it('should call onFolderClick with node', async () => {
    const { getByLabelText } = await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await fireEvent.click(getByLabelText('folder'))

    expect(onFolderClick).toBeCalledWith(folderNode)
  })

  it('should call onChevronClick if chevron is clicked', async () => {
    const { getByLabelText } = await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await fireEvent.click(getByLabelText('chevron'))

    expect(onChevronClick).toBeCalledWith(expect.anything(), folderNode)
  })

  it('should open folder dropdown menu', async () => {
    const { getByLabelText, getByText } = await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await fireEvent.click(getByLabelText(`${folderNode.name} actions`))

    expect(getByText('Create file')).toBeInTheDocument()
  })

  it('should open file input when create new file is selected from folder dropdown', async () => {
    const { getByLabelText } = await render(
      <Folder
        node={folderNode as IFolderNode}
        level={1}
        childNodes={childNodes}
      />
    )

    await fireEvent.click(getByLabelText(`${folderNode.name} actions`))

    await fireEvent.click(getByLabelText('Create file'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })
})
