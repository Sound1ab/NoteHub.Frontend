import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { act, cleanup, fireEvent, render } from '../../../test-utils'
import {
  MutationCreateRepoArgs,
  Repo,
} from '../../apollo/generated_components_typings'
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
    Mutation: () => ({
      createRepo: (_: any, { input }: MutationCreateRepoArgs): Repo => ({
        id: 3,
        node_id: 'MOCK_NODE_ID',
        name: input.name,
        full_name: 'MOCK_FULL_NAME',
        description: input.description,
        private: input.private ?? false,
      }),
    }),
    GithubUser: () => ({
      id: 1,
      login: 'MOCK_LOGIN',
      avatar_url: 'MOCK_AVATAR_URL',
      html_url: 'MOCK_HTML_URL',
      name: 'MOCK_NAME',
    }),
  }

  it('should list repos', async () => {
    const [{ name: firstRepoName }, { name: secondRepoName }] = repos
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(getByText(firstRepoName)).toBeDefined()
    expect(getByText(secondRepoName)).toBeDefined()
  })

  it('should add new repos', async () => {
    const newRepoName = 'MOCK_REPO_NAME'

    const { getByText, getByLabelText, queryByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByText('New Repo'))

    await act(() => wait(0))

    const input = getByLabelText('Repo name')

    fireEvent.change(input, {
      target: { value: newRepoName },
    })

    const form = getByLabelText('Repo name')

    fireEvent.submit(form)

    await act(() => wait(0))

    expect(queryByLabelText('Repo name')).toBeNull()

    expect(getByText(newRepoName)).toBeDefined()
  })
})
