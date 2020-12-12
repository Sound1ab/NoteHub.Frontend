import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCodeMirror } from '../../../../hooks'
import { resolvers } from '../../../../schema/mockResolvers'
import { cleanup, fireEvent, render } from '../../../../test-utils'
import { MockProvider } from '../../../providers'
import { localState } from '../../../providers/ApolloProvider/cache'
import { Toolbar } from './Toolbar'

jest.mock('../../../../hooks/context/useCodeMirror')

afterEach(cleanup)

describe('Toolbar', () => {
  const toggleSideBySide = jest.fn()
  const togglePreview = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCodeMirror as jest.Mock).mockReturnValue({
      toggleSideBySide,
      togglePreview,
      editor: 'MOCK_EDITOR',
    })
  })

  it.each([
    [toggleSideBySide, 'Toggle side by side'],
    [togglePreview, 'Toggle preview'],
  ])('should call codemirror using buttons', async (fn, title) => {
    const { getByTitle } = await render(
      <MockProvider
        mockResolvers={resolvers}
        localData={{
          currentPath: () => localState.currentPathVar('MOCK_FILE_PATH_1.md'),
        }}
      >
        <Toolbar />
      </MockProvider>
    )

    await fireEvent.click(getByTitle(title))

    expect(fn).toBeCalled()
  })
})
