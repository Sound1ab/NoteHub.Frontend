import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { repos, resolvers } from '../../../schema/mockResolvers'
import { cleanup, render } from '../../../test-utils'
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
})
