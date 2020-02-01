import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { REPO_NAMESPACE, useDeleteRepo, useUpdateRepo } from '../../../hooks'
import { repos, resolvers, user } from '../../../schema/mockResolvers'
import { fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { NavigationItem } from './NavigationItem'

jest.mock('../../../hooks/Repo/useDeleteRepo')
jest.mock('../../../hooks/Repo/useUpdateRepo')

describe('NavigationItem', () => {
  const heading = 'MOCK_HEADING'
  const onClick = jest.fn()
  const deleteRepo = jest.fn()
  const updateRepo = jest.fn()
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
    ;(useDeleteRepo as jest.Mock).mockReturnValue([deleteRepo])
    ;(useUpdateRepo as jest.Mock).mockReturnValue([updateRepo])
  })

  it('should call onClick when clicked', async () => {
    const { getByText } = await render(
      <NavigationItem
        heading={heading}
        isActive={false}
        isPrivate={false}
        onClick={onClick}
        isDisabled={false}
        id={1}
        nodeId={'MOCK_ID'}
      />
    )

    await fireEvent.click(getByText(heading))

    expect(onClick).toBeCalled()
  })

  it('should display heading', async () => {
    ;(useDeleteRepo as jest.Mock).mockReturnValue([deleteRepo])
    ;(useUpdateRepo as jest.Mock).mockReturnValue([updateRepo])

    const { getByText } = await render(
      <NavigationItem
        heading={heading}
        isActive={false}
        isPrivate={false}
        onClick={onClick}
        isDisabled={false}
        id={1}
        nodeId={'MOCK_ID'}
      />
    )

    expect(getByText(heading)).toBeDefined()
  })

  it('should disabled click when passed isDisabled prop', async () => {
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NavigationItem
          heading={heading}
          isActive={false}
          isPrivate={false}
          onClick={onClick}
          isDisabled={true}
          id={1}
          nodeId={'MOCK_ID'}
        />
      </MockProvider>
    )

    await fireEvent.click(getByText(heading))

    expect(onClick).not.toBeCalled()
  })

  it('should disabled click when dropdown is open', async () => {
    const { getByText, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NavigationItem
          heading={heading}
          isActive={false}
          isPrivate={false}
          onClick={onClick}
          isDisabled={false}
          id={1}
          nodeId={'MOCK_ID'}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Repo dropdown'))

    await fireEvent.click(getByText(heading))

    expect(onClick).not.toBeCalled()
  })

  it('should call deleteRepo from dropdown', async () => {
    const { login } = user
    const [{ id, node_id: nodeId, private: isPrivate }] = repos

    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NavigationItem
          heading={heading}
          isActive={false}
          isPrivate={isPrivate}
          onClick={onClick}
          isDisabled={false}
          id={id}
          nodeId={nodeId}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Repo dropdown'))

    await fireEvent.click(getByLabelText('Delete repo'))

    expect(deleteRepo).toBeCalledWith({
      variables: {
        input: {
          repo: heading,
          username: login,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteRepo: {
          __typename: 'Repo',
          full_name: `${login}/${REPO_NAMESPACE}.${heading}`,
          id,
          name: heading,
          node_id: nodeId,
          description: null,
          private: isPrivate,
        },
      },
    })
  })

  it('should call updateRepo from dropdown', async () => {
    const { login } = user
    const [{ id, node_id: nodeId, private: isPrivate }] = repos

    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NavigationItem
          heading={heading}
          isActive={false}
          isPrivate={isPrivate}
          onClick={onClick}
          isDisabled={false}
          id={id}
          nodeId={nodeId}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Repo dropdown'))

    await fireEvent.click(getByLabelText('Make private'))

    expect(updateRepo).toBeCalledWith({
      variables: {
        input: {
          repo: heading,
          username: login,
          private: !isPrivate,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateRepo: {
          __typename: 'Repo',
          full_name: `${login}/${REPO_NAMESPACE}.${heading}`,
          id,
          name: heading,
          node_id: nodeId,
          description: null,
          private: !isPrivate,
        },
      },
    })
  })

  it('should show alert if there was a problem deleting file', async () => {
    const [{ id, node_id: nodeId, private: isPrivate }] = repos
    const deleteRepo = jest.fn(() => Promise.reject())
    ;(useDeleteRepo as jest.Mock).mockReturnValue([deleteRepo])

    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <NavigationItem
          heading={heading}
          isActive={false}
          isPrivate={isPrivate}
          onClick={onClick}
          isDisabled={false}
          id={id}
          nodeId={nodeId}
        />
      </MockProvider>
    )

    await fireEvent.click(getByLabelText('Repo dropdown'))

    await fireEvent.click(getByLabelText('Delete repo'))

    expect(alert).toBeCalledWith(
      'There was an issue deleting your file, please try again'
    )
  })
})
