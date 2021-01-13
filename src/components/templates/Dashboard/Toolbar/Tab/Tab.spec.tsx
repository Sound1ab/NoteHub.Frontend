import userEvent from '@testing-library/user-event'
import React from 'react'

import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useTabs } from '../../../../../hooks/recoil/useTabs'
import { render } from '../../../../../test-utils'
import { Tab } from './Tab'

jest.mock('../../../../../hooks/recoil/useTabs', () => ({
  useTabs: jest.fn(),
}))
jest.mock('../../../../../hooks/recoil/useActivePath', () => ({
  useActivePath: jest.fn(),
}))

describe('Tab', () => {
  const name = 'MOCK_NAME'

  const path = 'MOCK_PATH'

  const tabs = new Set([path, 'MOCK_PATH_1'])

  const setTabs = jest.fn()

  const setActivePath = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])
    ;(useActivePath as jest.Mock).mockReturnValue([path, setActivePath])
  })

  it('should display heading and close icon', async () => {
    const { getByText, getByTitle } = await render(
      <Tab name={name} path={path} isDisabled={false} />
    )

    expect(getByText(name)).toBeInTheDocument()
    expect(getByTitle('close')).toBeInTheDocument()
  })

  it('should call setActivePath with path if clicked', async () => {
    const { getByText } = await render(
      <Tab name={name} path={path} isDisabled={false} />
    )

    await userEvent.click(getByText(name))

    expect(setActivePath).toBeCalledWith(path)
  })

  describe('if active', () => {
    it('should call setActivePath with the left tab if it exists', async () => {
      const tabs = new Set(['MOCK_PATH_LEFT', path, 'MOCK_PATH_RIGHT'])

      ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

      const { getByTitle } = await render(
        <Tab name={name} path={path} isDisabled={false} />
      )

      await userEvent.click(getByTitle('close'))

      expect(setActivePath).toBeCalledWith('MOCK_PATH_LEFT')
    })

    it('should call currentPathVar with the right tab if left does not exist', async () => {
      const tabs = new Set([path, 'MOCK_PATH_RIGHT'])

      ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

      const { getByTitle } = await render(
        <Tab name={name} path={path} isDisabled={false} />
      )

      await userEvent.click(getByTitle('close'))

      expect(setActivePath).toBeCalledWith('MOCK_PATH_RIGHT')
    })

    it('should call currentPathVar with the empty string if no left or right tab exist', async () => {
      const tabs = new Set([path])

      ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

      const { getByTitle } = await render(
        <Tab name={name} path={path} isDisabled={false} />
      )

      await userEvent.click(getByTitle('close'))

      expect(setActivePath).toBeCalledWith('')
    })
  })

  it('should remove itself from tabs', async () => {
    const tabs = new Set([path])

    ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

    const { getByTitle } = await render(
      <Tab name={name} path={path} isDisabled={false} />
    )

    await userEvent.click(getByTitle('close'))

    expect(setTabs).toBeCalledWith(new Set([]))
  })
})
