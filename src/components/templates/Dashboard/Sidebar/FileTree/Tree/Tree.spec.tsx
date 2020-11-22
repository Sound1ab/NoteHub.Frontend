import React from 'react'

import { files, resolvers } from '../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../test-utils'
import { createNodes } from '../../../../../../utils'
import { Node_Type } from '../../../../../apollo'
import { MockProvider } from '../../../../../providers'
import { Tree } from './Tree'

describe('Tree', () => {
  const nodes = createNodes(files, new Set())

  const [folderNode] = nodes.filter((node) => node.type === Node_Type.Folder)
  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  it('should show children when toggled is true and tree has children', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Tree
          node={{ ...folderNode, toggled: true, children: [fileNode] }}
          level={1}
        />
      </MockProvider>
    )

    expect(getByText(fileNode.name)).toBeInTheDocument()
  })

  it('should open file input when create new file is selected from dropdown', async () => {
    const { getAllByLabelText, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Tree
          node={{ ...folderNode, toggled: true, children: [fileNode] }}
          level={1}
        />
      </MockProvider>
    )

    const [folderDropdown] = getAllByLabelText(`${folderNode.name} actions`)

    await fireEvent.click(folderDropdown)

    await fireEvent.click(getByLabelText('Create file'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })
})
