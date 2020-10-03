import { useApolloClient } from '@apollo/react-hooks'
import React from 'react'

import { fileNodeOne, resolvers } from '../../../schema/mockResolvers'
import { fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { NodeItem } from './NodeItem'

jest.mock('@apollo/react-hooks', () => {
  const originalModule = jest.requireActual('@apollo/react-hooks')

  return {
    ...originalModule,
    useApolloClient: jest.fn(),
  }
})

describe('NodeItem', () => {
  const writeData = jest.fn()

  const dropdownItems = [
    {
      icon: 'edit' as const,
      prefix: 'fa' as const,
      label: 'Create file',
      onClick: jest.fn(),
    },
  ]

  const onClick = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useApolloClient as jest.Mock).mockReturnValue({
      writeData,
    })
  })

  it('should update the currentPath with clicked node path', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NodeItem
          node={fileNodeOne}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
        />
      </MockProvider>
    )

    await fireEvent.click(getByText('MOCK_FILE_PATH_1.md'))

    expect(writeData).toBeCalledWith({
      data: { currentPath: fileNodeOne.path },
    })
  })

  it('should disable clicks if optimistically updated', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NodeItem
          node={{ ...fileNodeOne, isOptimistic: true }}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
        />
      </MockProvider>
    )

    await fireEvent.click(getByText('MOCK_FILE_PATH_1.md'))

    expect(writeData).not.toBeCalledWith({
      data: { currentPath: fileNodeOne.path },
    })
  })

  it('should call onClick callback', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NodeItem
          node={fileNodeOne}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
        />
      </MockProvider>
    )

    await fireEvent.click(getByText('MOCK_FILE_PATH_1.md'))

    expect(onClick).toBeCalled()
  })

  it('should open dropdown', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NodeItem
          node={fileNodeOne}
          level={1}
          dropdownItems={dropdownItems}
          onClick={onClick}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('MOCK_FILE_PATH_1.md actions'))

    expect(getByLabelText('Create file')).toBeInTheDocument()
  })
})
