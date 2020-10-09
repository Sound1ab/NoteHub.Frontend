import React from 'react'

import {
  fileNodeOne,
  folderNode,
  resolvers,
} from '../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../test-utils'
import { MockProvider } from '../../../../../providers'
import { Tree } from './Tree'

describe('Tree', () => {
  const onToggle = jest.fn()

  it('should show children when toggled is true and tree has children', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Tree
          node={{ ...folderNode, toggled: true, children: [fileNodeOne] }}
          onToggle={onToggle}
          level={1}
        />
      </MockProvider>
    )

    expect(getByText(fileNodeOne.name)).toBeInTheDocument()
  })

  it('should open file input when create new file is selected from dropdown', async () => {
    const { getAllByLabelText, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Tree
          node={{ ...folderNode, toggled: true, children: [fileNodeOne] }}
          onToggle={onToggle}
          level={1}
        />
      </MockProvider>
    )

    const [folderDropdown] = getAllByLabelText('MOCK_FOLDER actions')

    await fireEvent.click(folderDropdown)

    await fireEvent.click(getByLabelText('Create file'))

    expect(getByLabelText('Input file name')).toBeInTheDocument()
  })
})
