import React from 'react'

import { files, resolvers } from '../../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../../test-utils'
import { createNodes } from '../../../../../../../utils'
import { Node_Type } from '../../../../../../apollo'
import { MockProvider } from '../../../../../../providers'
import { Node } from './Node'

describe('Node', () => {
  const dropdownItems = [
    {
      icon: 'edit' as const,
      prefix: 'fas' as const,
      label: 'Create file',
      onClick: jest.fn(),
    },
  ]

  const onClick = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  it('should call onClick callback', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Node
          node={fileNode}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
        />
      </MockProvider>
    )

    await fireEvent.click(getByText(fileNode.name))

    expect(onClick).toBeCalled()
  })

  it('should open dropdown', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Node
          node={fileNode}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    expect(getByLabelText('Create file')).toBeInTheDocument()
  })
})
