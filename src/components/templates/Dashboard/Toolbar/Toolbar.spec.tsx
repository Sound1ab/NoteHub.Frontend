import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { useCodeMirror, useReadTabs } from '../../../../hooks'
import { cleanup, fireEvent, render } from '../../../../test-utils'
import { localState } from '../../../providers/ApolloProvider/cache'
import { Toolbar } from './Toolbar'

jest.mock('../../../../hooks/context/useCodeMirror')
jest.mock('../../../../hooks/localState/useReadTabs')

afterEach(cleanup)

describe('Toolbar', () => {
  const toggleSideBySide = jest.fn()
  const togglePreview = jest.fn()

  const tabs = new Set(['MOCK_PATH_0.md', 'MOCK_PATH_1.md'])

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useCodeMirror as jest.Mock).mockReturnValue({
      toggleSideBySide,
      togglePreview,
      editor: 'MOCK_EDITOR',
    })
    ;(useReadTabs as jest.Mock).mockReturnValue(tabs)
  })

  it.each([
    [toggleSideBySide, 'Toggle side by side'],
    [togglePreview, 'Toggle preview'],
  ])('should call codemirror using buttons', async (fn, title) => {
    const { getByTitle } = await render(<Toolbar />, {
      localState: [() => localState.currentPathVar('MOCK_FILE_PATH_1.md')],
    })

    await fireEvent.click(getByTitle(title))

    expect(fn).toBeCalled()
  })

  it('should display tabs', async () => {
    const { getByText } = await render(<Toolbar />, {
      localState: [() => localState.currentPathVar('MOCK_FILE_PATH_1.md')],
    })

    expect(getByText('MOCK_PATH_0.md')).toBeInTheDocument()
    expect(getByText('MOCK_PATH_1.md')).toBeInTheDocument()
  })
})
