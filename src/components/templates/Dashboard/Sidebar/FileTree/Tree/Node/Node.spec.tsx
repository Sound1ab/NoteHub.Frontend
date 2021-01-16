import { screen } from '@testing-library/react'
import React from 'react'

import { fireEvent, render } from '../../../../../../../test-utils'
import { getMockNodes } from '../../../../../../../utils/testing/getMockNodes'
import { Node } from './Node'

jest.mock('../../../../../../../hooks/recoil/useActivePath')

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

  it('should add styles when dropdown is open to make it obvious this node is in use', async () => {
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

  it('should add styles when node is disabled', async () => {
    await render(
      <Node
        node={{ ...fileNode, isOptimistic: true }}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      >
        children
      </Node>
    )

    expect(screen.getByLabelText('file')).toHaveStyleRule(
      'cursor',
      'not-allowed'
    )
  })

  it('should add styles when node is active', async () => {
    await render(
      <Node
        node={{ ...fileNode, path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md' }}
        level={1}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    expect(screen.getByLabelText('file')).toHaveStyleRule(
      'background-color',
      'var(--background-quaternary)'
    )
  })

  it('should add styles based on the level of the node', async () => {
    await render(
      <Node
        node={{ ...fileNode, path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md' }}
        level={2}
        dropdownItems={dropdownItems}
        onClick={onClick}
      />
    )

    expect(screen.getByLabelText('file')).toHaveStyleRule(
      'padding-left',
      'calc(calc(2 * 1.45rem) + 1.885rem)'
    )
  })

  it('should embed children into the layout', async () => {
    await render(
      <Node
        node={{ ...fileNode, path: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md' }}
        level={2}
        dropdownItems={dropdownItems}
        onClick={onClick}
      >
        children
      </Node>
    )

    expect(screen.getByText('children')).toBeInTheDocument()
  })
})
