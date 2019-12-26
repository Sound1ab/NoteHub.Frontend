import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { act, cleanup, fireEvent, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { CardList } from './CardList'

afterEach(cleanup)

describe('CardList', () => {
  const currentRepoName = 'MOCK_REPO_NAME'

  const files = [
    {
      filename: 'MOCK_FILENAME_2',
      path: 'MOCK_PATH_2',
      content: 'MOCK_CONTENT_2',
      excerpt: 'MOCK_EXCERPT_2',
      sha: 'MOCK_SHA_2',
      repo: 'MOCK_REPO_2',
      _links: {
        html: 'MOCK_HTML_LINK_2',
      },
    },
    {
      filename: 'MOCK_FILENAME_1',
      path: 'MOCK_PATH_1',
      content: 'MOCK_CONTENT_1',
      excerpt: 'MOCK_EXCERPT_1',
      sha: 'MOCK_SHA_1',
      repo: 'MOCK_REPO_1',
      _links: {
        html: 'MOCK_HTML_LINK_1',
      },
    },
  ]

  const resolvers = {
    Query: () => ({
      listFiles: () => ({
        items: files,
      }),
    }),
  }

  it('should show cards in alphabetical order', async () => {
    const { getByText, getAllByTestId } = render(
      <MockProvider mockResolvers={resolvers} localData={{ currentRepoName }}>
        <CardList />
      </MockProvider>
    )

    await act(() => wait(0))

    files.forEach(({ filename }) => {
      expect(getByText(filename)).toBeDefined()
    })

    const headings = getAllByTestId('card')

    expect(headings[0].textContent).toBe(files[1].filename)
    expect(headings[1].textContent).toBe(files[0].filename)
  })

  it('should select a card item', async () => {
    const [{ filename: activeFilename }, { filename: inactiveFilename }] = files

    const { getByText } = render(
      <MockProvider mockResolvers={resolvers} localData={{ currentRepoName }}>
        <CardList />
      </MockProvider>
    )

    await act(() => wait(0))

    fireEvent.click(getByText(activeFilename))

    expect(getByText(activeFilename)).toHaveAttribute(
      'aria-label',
      `${activeFilename} is selected`
    )

    fireEvent.click(getByText(inactiveFilename))

    await act(() => wait(0))

    expect(getByText(inactiveFilename)).toHaveAttribute(
      'aria-label',
      `${inactiveFilename} is selected`
    )
  })
})
