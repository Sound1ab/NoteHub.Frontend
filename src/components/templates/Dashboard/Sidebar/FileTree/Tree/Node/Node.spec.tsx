import React from 'react'

import {
  fileNodeOne,
  resolvers,
} from '../../../../../../../schema/mockResolvers'
import { fireEvent, render } from '../../../../../../../test-utils'
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

  const isActive = false

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call onClick callback', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Node
          node={fileNodeOne}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
          isActive={isActive}
        />
      </MockProvider>
    )

    await fireEvent.click(getByText('MOCK_FILE_PATH_1.md'))

    expect(onClick).toBeCalled()
  })

  it('should open dropdown', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Node
          node={fileNodeOne}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
          isActive={isActive}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    expect(getByLabelText('Create file')).toBeInTheDocument()
  })
})
