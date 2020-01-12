import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { repos, resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Sidebar } from './Sidebar'

afterEach(cleanup)

jest.mock('../../../utils/scrollIntoView')

describe('Sidebar', () => {
  it('should list repos', async () => {
    const [{ name: firstRepoName }, { name: secondRepoName }] = repos
    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Sidebar />
      </MockProvider>
    )

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

    await fireEvent.click(getByText('New Repo'))

    const input = getByLabelText('Repo name')

    await fireEvent.change(input, {
      target: { value: newRepoName },
    })

    const form = getByLabelText('Repo name')

    await fireEvent.submit(form)

    expect(queryByLabelText('Repo name')).toBeNull()

    expect(getByText(newRepoName)).toBeDefined()
  })
})
