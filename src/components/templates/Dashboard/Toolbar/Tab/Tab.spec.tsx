import userEvent from '@testing-library/user-event'
import React from 'react'

import { useReadCurrentPath, useReadTabs } from '../../../../../hooks'
import { cleanup, render } from '../../../../../test-utils'
import { localState } from '../../../../providers/ApolloProvider/cache'
import { Tab } from './Tab'

jest.mock('../../../../../hooks/localState/useReadTabs')
jest.mock('../../../../../hooks/localState/useReadCurrentPath')

afterEach(cleanup)

describe('Tab', () => {
  const name = 'MOCK_NAME'

  const path = 'MOCK_PATH'

  const tabs = new Set([path, 'MOCK_PATH_1'])

  const currentPathVar = jest.spyOn(localState, 'currentPathVar')
  const tabsVar = jest.spyOn(localState, 'tabsVar')

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useReadTabs as jest.Mock).mockReturnValue(tabs)
    ;(useReadCurrentPath as jest.Mock).mockReturnValue('')
  })

  it('should display heading and close icon', async () => {
    const { getByText, getByTitle } = await render(
      <Tab name={name} path={path} />
    )

    expect(getByText(name)).toBeInTheDocument()
    expect(getByTitle('close')).toBeInTheDocument()
  })

  it('should call currentPathVar with path if clicked', async () => {
    const { getByText } = await render(<Tab name={name} path={path} />)

    await userEvent.click(getByText(name))

    expect(currentPathVar).toBeCalledWith(path)
  })

  describe('if active', () => {
    it('should call currentPathVar with the left tab if it exists', async () => {
      const tabs = new Set(['MOCK_PATH_LEFT', path, 'MOCK_PATH_RIGHT'])

      ;(useReadTabs as jest.Mock).mockReturnValue(tabs)
      ;(useReadCurrentPath as jest.Mock).mockReturnValue(path)

      const { getByTitle } = await render(<Tab name={name} path={path} />)

      await userEvent.click(getByTitle('close'))

      expect(currentPathVar).toBeCalledWith('MOCK_PATH_LEFT')
    })

    it('should call currentPathVar with the right tab if left does not exist', async () => {
      const tabs = new Set([path, 'MOCK_PATH_RIGHT'])

      ;(useReadTabs as jest.Mock).mockReturnValue(tabs)
      ;(useReadCurrentPath as jest.Mock).mockReturnValue(path)

      const { getByTitle } = await render(<Tab name={name} path={path} />)

      await userEvent.click(getByTitle('close'))

      expect(currentPathVar).toBeCalledWith('MOCK_PATH_RIGHT')
    })

    it('should call currentPathVar with the empty string if no left or right tab exist', async () => {
      const tabs = new Set([path])

      ;(useReadTabs as jest.Mock).mockReturnValue(tabs)
      ;(useReadCurrentPath as jest.Mock).mockReturnValue(path)

      const { getByTitle } = await render(<Tab name={name} path={path} />)

      await userEvent.click(getByTitle('close'))

      expect(currentPathVar).toBeCalledWith('')
    })
  })

  it('should remove itself from tabs', async () => {
    const tabs = new Set([path])

    ;(useReadTabs as jest.Mock).mockReturnValue(tabs)
    ;(useReadCurrentPath as jest.Mock).mockReturnValue(path)

    const { getByTitle } = await render(<Tab name={name} path={path} />)

    await userEvent.click(getByTitle('close'))

    expect(tabsVar).toBeCalledWith(new Set([]))
  })
})
