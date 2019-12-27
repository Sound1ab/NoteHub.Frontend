import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { files, resolvers } from '../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { CardList } from './CardList'

afterEach(cleanup)

describe('CardList', () => {
  const currentRepoName = 'MOCK_REPO_NAME'

  it('should show cards in alphabetical order', async () => {
    const { getByText, getAllByTestId } = await render(
      <MockProvider mockResolvers={resolvers} localData={{ currentRepoName }}>
        <CardList />
      </MockProvider>
    )

    files.forEach(({ filename }) => {
      expect(getByText(filename)).toBeDefined()
    })

    const headings = getAllByTestId('card')

    expect(headings[0].textContent).toBe(files[1].filename)
    expect(headings[1].textContent).toBe(files[0].filename)
  })

  it('should select a card item', async () => {
    const [{ filename: activeFilename }, { filename: inactiveFilename }] = files

    const { getByText } = await render(
      <MockProvider mockResolvers={resolvers} localData={{ currentRepoName }}>
        <CardList />
      </MockProvider>
    )

    await fireEvent.click(getByText(activeFilename))

    expect(getByText(activeFilename)).toHaveAttribute(
      'aria-label',
      `${activeFilename} is selected`
    )

    await fireEvent.click(getByText(inactiveFilename))

    expect(getByText(inactiveFilename)).toHaveAttribute(
      'aria-label',
      `${inactiveFilename} is selected`
    )
  })
})
