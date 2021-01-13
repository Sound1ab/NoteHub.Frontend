import { screen } from '@testing-library/react'
import React from 'react'

import { fireEvent, render } from '../../../../../../../test-utils'
import { getMockNodes } from '../../../../../../../utils/testing/getMockNodes'
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

  const { fileNode } = getMockNodes()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call onClick callback', async () => {
    await render(
      <Node
        node={fileNode}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    await fireEvent.click(screen.getByText(fileNode.name))

    expect(onClick).toBeCalled()
  })

  it('should open dropdown', async () => {
    await render(
      <Node
        node={fileNode}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    await fireEvent.click(screen.getByLabelText(`${fileNode.name} actions`))

    expect(screen.getByLabelText('Create file')).toBeInTheDocument()
  })

  it('should add styles when dropdown is open', async () => {
    await render(
      <Node
        node={fileNode}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    const actions = screen.getByLabelText(`${fileNode.name} actions`)

    await fireEvent.click(actions)

    expect(screen.getByLabelText('file')).toHaveStyleRule(
      'background-color',
      'var(--background-quinary)'
    )

    expect(actions).toHaveStyleRule('opacity', '1')

    expect(actions).toHaveStyleRule(
      'background-color',
      'var(--background-quaternary)'
    )
  })
})
