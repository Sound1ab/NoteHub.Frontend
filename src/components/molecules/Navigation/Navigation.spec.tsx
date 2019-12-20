import { render, act, fireEvent } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Navigation } from './Navigation'
import { MockProvider } from '../../utility'
import { wait } from '@apollo/react-testing'

describe('Navigation', () => {
  const setIsNewRepoOpen = jest.fn()
  const repos = [
    {
      description: 'MOCK_DESCRIPTION_2',
      full_name: 'MOCK_FULL_NAME_2',
      id: 2,
      name: 'MOCK_NAME_2',
      node_id: 'MOCK_ID_2',
      private: false,
    },
    {
      description: 'MOCK_DESCRIPTION_1',
      full_name: 'MOCK_FULL_NAME_1',
      id: 1,
      name: 'MOCK_NAME_1',
      node_id: 'MOCK_ID_1',
      private: true,
    },
  ]
  const resolvers = {
    Query: () => ({
      listRepos: () => ({
        items: repos,
      }),
    }),
  }

  it('should display navigation items in alphabetical order', async () => {
    const { getByText, getAllByTestId } = render(
      <MockProvider mockResolvers={resolvers}>
        <Navigation isNewRepoOpen={false} setIsNewRepoOpen={setIsNewRepoOpen} />
      </MockProvider>
    )

    await act(() => wait(0))

    repos.forEach(({ name }) => {
      expect(getByText(name)).toBeDefined()
    })

    const headings = getAllByTestId('navigation-item-heading')

    expect(headings[0].textContent).toBe(repos[1].name)
    expect(headings[1].textContent).toBe(repos[0].name)
  })

  it('should select a navigation item', async () => {
    const [{ name: activeRepoName }, { name: inactiveRepoName }] = repos

    const { getByText } = render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentRepoName: activeRepoName }}
      >
        <Navigation isNewRepoOpen={false} setIsNewRepoOpen={setIsNewRepoOpen} />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(getByText(activeRepoName)).toHaveAttribute(
      'aria-label',
      `${activeRepoName} is selected`
    )

    fireEvent.click(getByText(inactiveRepoName))

    await act(() => wait(0))

    expect(getByText(inactiveRepoName)).toHaveAttribute(
      'aria-label',
      `${inactiveRepoName} is selected`
    )
  })

  it('should show input for new repo if isNewRepoOpen', async () => {
    const { getByLabelText } = render(
      <MockProvider mockResolvers={resolvers}>
        <Navigation isNewRepoOpen={true} setIsNewRepoOpen={setIsNewRepoOpen} />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(getByLabelText('Add a new repo')).toBeDefined()
  })
})
