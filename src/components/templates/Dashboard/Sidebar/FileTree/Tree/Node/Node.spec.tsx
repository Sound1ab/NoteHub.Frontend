import React from 'react'

import { files } from '../../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../../test-utils'
import { createNodes } from '../../../../../../../utils/createNodes'
import { Node_Type } from '../../../../../../apollo/generated_components_typings'
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
      <Node
        node={fileNode}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    await fireEvent.click(getByText(fileNode.name))

    expect(onClick).toBeCalled()
  })

  it('should open dropdown', async () => {
    const { getByLabelText } = await render(
      <Node
        node={fileNode}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    await fireEvent.click(getByLabelText(`${fileNode.name} actions`))

    expect(getByLabelText('Create file')).toBeInTheDocument()
  })

  it('should add styles when dropdown is open', async () => {
    const { getByLabelText } = await render(
      <Node
        node={fileNode}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    const actions = getByLabelText(`${fileNode.name} actions`)

    await fireEvent.click(actions)

    expect(getByLabelText('file')).toHaveStyleRule(
      'background-color',
      'var(--background-tertiary)'
    )

    expect(actions).toHaveStyleRule('opacity', '1')

    expect(actions).toHaveStyleRule(
      'background-color',
      'var(--background-quaternary)'
    )
  })
})
