import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fileGitNodeTwo, resolvers } from '../../../schema/mockResolvers'
import { cleanup, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Editor } from './Editor'

afterEach(cleanup)

jest.mock('react-simplemde-editor', function() {
  return {
    __esModule: true,
    default({ value }: any) {
      return <div>{value}</div>
    },
  }
})

describe('Editor', () => {
  it('should toggle between markdown editor and preview', async () => {
    const { rerender, getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ isEdit: true, currentPath: fileGitNodeTwo.path }}
      >
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()

    await rerender(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ isEdit: false, currentPath: fileGitNodeTwo.path }}
      >
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown preview')).toBeDefined()
  })
})
