import '@testing-library/jest-dom/extend-expect'

import { wait } from '@apollo/react-testing'
import React from 'react'

import { act, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
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
  it('should add to the dom the output of markdown-it', async () => {
    const { getByText } = await render(
      <MockProvider>
        <MarkdownPreview />
      </MockProvider>
    )

    await act(() => wait(0))

    expect(getByText('some heading')).toBeDefined()
  })
})
