import React from 'react'

import { fileNode, folderNode, resolvers } from '../../../schema/mockResolvers'
import { fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Node } from './Node'

describe('Node', () => {
  const onToggle = jest.fn()

  it('should show children when toggled is true and node has children', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Node
          node={{ ...folderNode, toggled: true, children: [fileNode] }}
          onToggle={onToggle}
          level={1}
        />
      </MockProvider>
    )

    expect(getByText(fileNode.name)).toBeInTheDocument()
  })

  it('should open file input when create new file is selected from dropdown', async () => {
    const { getAllByLabelText, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Node
          node={{ ...folderNode, toggled: true, children: [fileNode] }}
          onToggle={onToggle}
          level={1}
        />
      </MockProvider>
    )

    const [folderDropdown] = getAllByLabelText('item menu')

    await fireEvent.click(folderDropdown)

    await fireEvent.click(getByLabelText('Create file'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })
})
