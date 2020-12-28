import React from 'react'

import { useReadFile } from '../../../../hooks/file/useReadFile'
import { files } from '../../../../schema/mockResolvers'
import { cleanup, render } from '../../../../test-utils'
import { createNodes } from '../../../../utils/createNodes'
import { Node_Type } from '../../../apollo/generated_components_typings'
import { localState } from '../../../providers/ApolloProvider/cache'
import { Editor } from './Editor'

jest.mock('../../../../hooks/file/useReadFile')

afterEach(cleanup)

describe('Editor', () => {
  const nodes = createNodes(files, new Set())

  const [fileNode] = nodes.filter((node) => node.type === Node_Type.File)

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should show editor', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({ loading: false })
    localState.currentPathVar(fileNode.path)

    const { getByLabelText } = await render(<Editor />)

    expect(getByLabelText('Markdown editor')).toBeDefined()
  })

  it('should show loading skeleton', async () => {
    ;(useReadFile as jest.Mock).mockReturnValue({ loading: true })
    localState.currentPathVar(fileNode.path)

    const { getByLabelText } = await render(<Editor />)

    expect(getByLabelText('Markdown loading')).toBeDefined()
  })
})
