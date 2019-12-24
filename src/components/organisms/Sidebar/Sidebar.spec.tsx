import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { act, cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Sidebar } from './Sidebar'

afterEach(cleanup)

describe('Sidebar', () => {
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

  it('should list repos', async () => {
    const [{ name: firstRepoName }, { name: secondRepoName }] = repos
    const { getByText, debug } = render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await act(() => wait(0))

    console.log(debug())

    expect(getByText(firstRepoName)).toBeDefined()
    expect(getByText(secondRepoName)).toBeDefined()
  })

  it('should add new repos', async () => {
    const { getByText, debug } = render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByText('New Repo'))
  })
})
