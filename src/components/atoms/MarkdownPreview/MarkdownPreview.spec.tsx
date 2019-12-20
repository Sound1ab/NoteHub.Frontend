import { render } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { MarkdownPreview } from './MarkdownPreview'

jest.mock('markdown-it', () => {
  return {
    __esModule: true,
    default: () => ({
      render: () => '<h1>some heading<h1>',
    }),
  }
})

describe('MarkdownPreview', () => {
  const value = 'MOCK_MARKDOWN_VALUE'

  it('should add to the dom the output of markdown-it', () => {
    const { getByText } = render(<MarkdownPreview value={value} />)

    expect(getByText('some heading')).toBeDefined()
  })
})
