import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useReadCurrentFileName } from '../../../hooks'
import { resolvers } from '../../../schema/mockResolvers'
import { cleanup, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Editor } from './Editor'

jest.mock('../../../hooks/localState/useReadCurrentFileName')

afterEach(cleanup)

describe('Editor', () => {
  it('should toggle between markdown editor and preview', async () => {
    ;(useReadCurrentFileName as jest.Mock).mockReturnValue({
      currentFileName: 'MOCK_FILE_NAME',
    })

    const { rerender, getByLabelText } = await render(
      <MockProvider mockResolvers={resolvers} localData={{ isEdit: true }}>
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()

    await rerender(
      <MockProvider mockResolvers={resolvers} localData={{ isEdit: false }}>
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown preview')).toBeDefined()
  })
})
