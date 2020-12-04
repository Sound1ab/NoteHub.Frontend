import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useReadFile } from '../../../../hooks'
import { files, resolvers } from '../../../../schema/mockResolvers'
import { cleanup, render } from '../../../../test-utils'
import { createNodes } from '../../../../utils'
import { Node_Type } from '../../../apollo'
import { MockProvider } from '../../../providers'
import { localState } from '../../../providers/ApolloProvider/cache'
import { Editor } from './Editor'

jest.mock('../../../../hooks/file/useReadFile')

afterEach(cleanup)

describe('Editor', () => {
  // This is an implementation detail inside codemirror.js
  // This may break if codemirror changes. Nulling createRange so
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

  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should show editor', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({ loading: false })

    const { getByLabelText } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () => localState.currentPathVar(fileNode.path),
        }}
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
        localData={{
          currentPath: () => localState.currentPathVar(fileNode.path),
        }}
      >
        <Editor />
      </MockProvider>
    )

    expect(getByLabelText('Markdown loading')).toBeDefined()
  })
})
