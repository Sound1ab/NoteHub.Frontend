import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { resolvers } from '../../../schema/mockResolvers'
import { cleanup, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { MarkdownEditor } from './MarkdownEditor'

afterEach(cleanup)

describe('MarkdownEditor', () => {
  ;(global as any).document.body.createTextRange = () => {
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
    jest.resetAllMocks()
  })

  it('should show markdown editor', async () => {
    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentPath: 'MOCK_FOLDER_PATH/MOCK_FILE_PATH_2.md' }}
      >
        <MarkdownEditor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeInTheDocument()
  })

  it('should not show markdown editor if path is not a file', async () => {
    const { queryByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentPath: 'MOCK_FOLDER_PATH' }}
      >
        <MarkdownEditor />
      </MockProvider>
    )

    expect(queryByLabelText('Markdown editor')).not.toBeInTheDocument()
  })
})
