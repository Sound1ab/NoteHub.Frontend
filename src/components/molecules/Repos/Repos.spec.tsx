import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { REPO_NAMESPACE, useDeleteRepo, useUpdateRepo } from '../../../hooks'
import { repos, resolvers, user } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Repos } from './Repos'

jest.mock('../../../utils/scrollIntoView')
jest.mock('../../../hooks/Repo/useDeleteRepo')
jest.mock('../../../hooks/Repo/useUpdateRepo')

afterEach(cleanup)

describe('Repos', () => {
  const deleteRepo = jest.fn()
  const updateRepo = jest.fn()
  const alert = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(global as any).alert = alert
    ;(useDeleteRepo as jest.Mock).mockReturnValue([deleteRepo])
    ;(useUpdateRepo as jest.Mock).mockReturnValue([updateRepo])
  })

  it.skip('should show loading skeleton', async () => {
    const { getByLabelText } = await render(<Repos />)

    expect(getByLabelText('Loading repos')).toBeDefined()
  })

  it('should display navigation items in alphabetical order', async () => {
    const { getByText, getAllByTestId } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Repos />
      </MockProvider>
    )

    repos.forEach(({ name }) => {
      expect(getByText(name)).toBeDefined()
    })

    const headings = getAllByTestId('list-item-heading')

    expect(headings[0].textContent).toBe(repos[1].name)
    expect(headings[1].textContent).toBe(repos[0].name)
  })

  it('should select a navigation item', async () => {
    const [{ name: activeRepoName }, { name: inactiveRepoName }] = repos

    const { getByText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: activeRepoName }}
      >
        <Repos />
      </MockProvider>
    )

    expect(getByText(activeRepoName)).toHaveAttribute(
      'aria-label',
      `${activeRepoName} is selected`
    )

    await fireEvent.click(getByText(inactiveRepoName))

    expect(getByText(inactiveRepoName)).toHaveAttribute(
      'aria-label',
      `${inactiveRepoName} is selected`
    )
  })

  it('should call deleteRepo from dropdown', async () => {
    const { login } = user
    const [
      { id, node_id: nodeId, private: isPrivate, description, name },
    ] = repos

    const { getByLabelText, getAllByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Repos />
      </MockProvider>
    )

    const dropdown = getAllByLabelText('dropdown')[1]

    await fireEvent.click(dropdown)

    await fireEvent.click(getByLabelText('Delete repo'))

    expect(deleteRepo).toBeCalledWith({
      variables: {
        input: {
          repo: name,
          username: login,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteRepo: {
          __typename: 'Repo',
          full_name: `${login}/${REPO_NAMESPACE}.${name}`,
          id,
          name: name,
          node_id: nodeId,
          description,
          private: isPrivate,
        },
      },
    })
  })

  it('should call updateRepo from dropdown', async () => {
    const { login } = user
    const [
      { id, node_id: nodeId, private: isPrivate, name, description },
    ] = repos

    const { getByLabelText, getAllByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Repos />
      </MockProvider>
    )

    const dropdown = getAllByLabelText('dropdown')[1]

    await fireEvent.click(dropdown)

    await fireEvent.click(getByLabelText('Make private'))

    expect(updateRepo).toBeCalledWith({
      variables: {
        input: {
          repo: name,
          username: login,
          private: !isPrivate,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateRepo: {
          __typename: 'Repo',
          full_name: `${login}/${REPO_NAMESPACE}.${name}`,
          id,
          name,
          node_id: nodeId,
          description,
          private: !isPrivate,
        },
      },
    })
  })

  it('should show alert if there was a problem deleting file', async () => {
    const deleteRepo = jest.fn(() => Promise.reject())
    ;(useDeleteRepo as jest.Mock).mockReturnValue([deleteRepo])

    const { getByLabelText, getAllByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Repos />
      </MockProvider>
    )

    const dropdown = getAllByLabelText('dropdown')[1]

    await fireEvent.click(dropdown)

    await fireEvent.click(getByLabelText('Delete repo'))

    expect(alert).toBeCalledWith(
      'There was an issue deleting your file, please try again'
    )
  })
})
