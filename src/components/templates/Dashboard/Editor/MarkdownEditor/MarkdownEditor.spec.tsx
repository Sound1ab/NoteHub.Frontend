import '@testing-library/jest-dom/extend-expect'

import React, { createRef } from 'react'

import { useReadFile, useUpdateFile } from '../../../../../hooks'
import { resolvers } from '../../../../../schema/mockResolvers'
import { cleanup, fireEvent, render, waitFor } from '../../../../../test-utils'
import { MockProvider } from '../../../../providers'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { MarkdownEditor } from './MarkdownEditor'

jest.mock('../../../../../hooks/file/useUpdateFile')
jest.mock('../../../../../hooks/file/useReadFile')

afterEach(cleanup)

describe('MarkdownEditor', () => {
  // This is an implementation detail inside codemirror.js
  // This may break if codemirror changes. Nulling createRange so
  // codemirror picks up createTextRange to place in their function 'range'
  // @ts-ignore
  global.document.createRange = null
  // @ts-ignore
  global.document.body.createTextRange = () => {
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
    ;(useUpdateFile as jest.Mock).mockImplementation(() => [
      jest.fn(),
      { loading: false },
    ])
    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'MOCK FILE CONTENTS',
        messages: {
          nodes: [],
        },
      },
    })
  })

  it('should show markdown editor', async () => {
    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeInTheDocument()
  })

  it('should not show markdown editor if path is not a file', async () => {
    const { queryByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () => localState.currentPathVar('MOCK_FOLDER_PATH'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    expect(queryByLabelText('Markdown editor')).not.toBeInTheDocument()
  })

  it('should display the toast alert if updating file errors', async () => {
    ;(useUpdateFile as jest.Mock).mockImplementation(() => [
      async () => {
        throw new Error('mock error')
      },
      { loading: false },
    ])

    const { rerender, getByText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>,
      { enableToast: true }
    )

    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'MOCK FILE CONTENTS new content',
        messages: {
          nodes: [],
        },
      },
    })

    await rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    await waitFor(() =>
      expect(
        getByText('There was an issue updating your document. mock error')
      ).toBeInTheDocument()
    )
  })

  it('should underline text if file contains messages', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'hello',
        readAt: '1',
      },
    })

    const { rerender, getByText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'heelo',
        readAt: '2',
        messages: {
          nodes: [
            {
              message: '`heelo` is misspelt',
              location: {
                start: {
                  offset: 0,
                },
                end: {
                  offset: 5,
                },
              },
            },
          ],
        },
      },
    })

    rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    expect(getByText('heelo')).toHaveAttribute(
      'style',
      'text-decoration: underline; text-decoration-color: red; text-decoration-style: wavy;'
    )
  })

  it('should display message widget when marker is clicked', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'hello',
        readAt: '1',
      },
    })

    const { rerender, getByText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    ;(useReadFile as jest.Mock).mockReturnValue({
      file: {
        content: 'heelo',
        messages: {
          nodes: [
            {
              message: '`heelo` is misspelt',
              location: {
                start: {
                  offset: 0,
                },
                end: {
                  offset: 5,
                },
              },
            },
          ],
        },
        readAt: '2',
      },
    })

    rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () =>
            localState.currentPathVar('MOCK_FOLDER_PATH/MOCK_FILE_PATH_4.md'),
        }}
      >
        <MarkdownEditor targetRef={createRef()} />
      </MockProvider>
    )

    await fireEvent.click(getByText('heelo'))

    expect(getByText('`heelo` is misspelt')).toBeInTheDocument()
  })
})
