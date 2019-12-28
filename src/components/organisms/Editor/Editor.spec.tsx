import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { resolvers } from '../../../schema/mockResolvers'
import { cleanup, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Editor } from './Editor'

afterEach(cleanup)

describe('Editor', () => {
  it('should toggle between markdown editor and preview', async () => {
    const { rerender, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers} localData={{ isEdit: true }}>
        <Editor setMarkdownCursorPosition={jest.fn()} />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()

    await rerender(
      <MockProvider mockResolvers={resolvers} localData={{ isEdit: false }}>
        <Editor setMarkdownCursorPosition={jest.fn()} />
      </MockProvider>
    )

    expect(getByLabelText('Markdown preview')).toBeDefined()
  })
})
