import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useReadFile } from '../../../hooks/file/useReadFile'
import { fileGitNodeTwo, resolvers } from '../../../schema/mockResolvers'
import { cleanup, render } from '../../../test-utils'
import { MockProvider } from '../../utility'
import { Editor } from './Editor'

jest.mock('../../../hooks/file/useReadFile')

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
  it('should show editor', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({ loading: false })

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentPath: fileGitNodeTwo.path }}
      >
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown editor')).toBeDefined()
  })

  it('should show loading skeleton', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({ loading: true })

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{ currentPath: fileGitNodeTwo.path }}
      >
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown loading')).toBeDefined()
  })
})
