import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { repos, resolvers } from '../../../schema/mockResolvers'
import { fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Navigation } from './Navigation'

describe('Navigation', () => {
  const setIsNewRepoOpen = jest.fn()

  it('should display navigation items in alphabetical order', async () => {
    const { getByText, getAllByTestId } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Navigation isNewRepoOpen={false} setIsNewRepoOpen={setIsNewRepoOpen} />
      </MockProvider>
    )

    repos.forEach(({ name }) => {
      expect(getByText(name)).toBeDefined()
    })

    const headings = getAllByTestId('navigation-item-heading')

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
        <Navigation isNewRepoOpen={false} setIsNewRepoOpen={setIsNewRepoOpen} />
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

  it('should show input for new repo if isNewRepoOpen', async () => {
    const { getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers}>
        <Navigation isNewRepoOpen={true} setIsNewRepoOpen={setIsNewRepoOpen} />
      </MockProvider>
    )

    expect(getByLabelText('Repo name')).toBeDefined()
  })
})
