import '@testing-library/jest-dom/extend-expect'

import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'

import { fileWithMessage, resolvers } from '../../../../../schema/mockResolvers'
import { cleanup, render, waitFor } from '../../../../../test-utils'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { MarkdownEditor } from './MarkdownEditor'

afterEach(cleanup)

jest.mock('../../../../../utils/debounce', () => ({
  debounce: (fn: () => void) => fn,
}))

describe('MarkdownEditor', () => {
  // Mocking out for codemirror as JSDOM doesn't do this
  // @ts-ignore
  global.document.createRange = () => {
    return {
      setEnd: jest.fn(),
      setStart: jest.fn(),
      getBoundingClientRect: function () {
        return { right: 0 }
      },
      getClientRects: function () {
        return {
          length: 0,
          left: 0,
          right: 0,
        }
      },
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show markdown editor', async () => {
    const { getByLabelText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [
          () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        ],
      }
    )

    expect(getByLabelText('Markdown editor')).toBeInTheDocument()
  })

  it('should not show markdown editor if path is not a file', async () => {
    const { queryByLabelText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [() => localState.currentPathVar('MOCK_FOLDER_PATH')],
      }
    )

    expect(queryByLabelText('Markdown editor')).not.toBeInTheDocument()
  })

  it('should display the toast alert if updating file errors', async () => {
    const { getByText, getByRole } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        enableToast: true,
        resolvers: {
          ...resolvers,
          Mutation: () => ({
            ...resolvers.Mutation(),
            updateFile: () => {
              throw new Error('mock error')
            },
          }),
        },
        localState: [
          () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        ],
      }
    )

    await act(async () => {
      userEvent.type(getByRole('textbox'), '1')
    })

    await waitFor(() =>
      expect(
        getByText('There was an issue updating your document. mock error')
      ).toBeInTheDocument()
    )
  })

  it('should underline text if file contains messages', async () => {
    const { getByText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [() => localState.currentPathVar('MOCK_FILE_PATH_4.md')],
        resolvers: {
          ...resolvers,
          Mutation: () => ({
            ...resolvers.Mutation(),
            updateFile: () => ({
              ...fileWithMessage,
              readAt: 'MOCK_READ_AT',
            }),
          }),
        },
      }
    )

    await waitFor(() => {
      expect(getByText('heelo')).toHaveAttribute(
        'style',
        'text-decoration: underline; text-decoration-color: #7072dd; text-decoration-style: wavy;'
      )
    })
  })

  it('should display message widget when marker is clicked', async () => {
    const { getByText } = await render(
      <MarkdownEditor targetRef={createRef()} />,
      {
        localState: [() => localState.currentPathVar('MOCK_FILE_PATH_4.md')],
        resolvers: {
          ...resolvers,
          Mutation: () => ({
            ...resolvers.Mutation(),
            updateFile: () => ({
              ...fileWithMessage,
              readAt: 'MOCK_READ_AT',
            }),
          }),
        },
      }
    )

    await userEvent.click(getByText('heelo'))

    await waitFor(() =>
      expect(getByText('`heelo` is misspelt')).toBeInTheDocument()
    )
  })
})
