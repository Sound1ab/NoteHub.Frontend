import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { useActivePath } from '../../../../../hooks/recoil/useActivePath'
import { useCommittedChanges } from '../../../../../hooks/recoil/useCommittedChanges'
import { useTabs } from '../../../../../hooks/recoil/useTabs'
import { useUnstagedChanges } from '../../../../../hooks/recoil/useUnstagedChanges'
import { render } from '../../../../../test-utils'
import { Tab } from './Tab'

jest.mock('../../../../../hooks/recoil/useUnstagedChanges', () => ({
  useUnstagedChanges: jest.fn(() => [[], jest.fn()]),
}))
jest.mock('../../../../../hooks/recoil/useCommittedChanges', () => ({
  useCommittedChanges: jest.fn(() => [[], jest.fn()]),
}))
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
    await render(<Tab name={name} path={path} isDisabled={false} />)

    expect(screen.getByText(name)).toBeInTheDocument()
    expect(screen.getByTitle('close')).toBeInTheDocument()
  })

  it('should call setActivePath with path if clicked', async () => {
    await render(<Tab name={name} path={path} isDisabled={false} />)

    await userEvent.click(screen.getByText(name))

    expect(setActivePath).toBeCalledWith(path)
  })

  describe('if it contains committed changes', () => {
    it('should add style', async () => {
      ;(useCommittedChanges as jest.Mock).mockReturnValue([[path], jest.fn()])

      await render(<Tab name={name} path={path} isDisabled={false} />)

      expect(screen.getByText(name)).toHaveStyleRule(
        'color',
        'var(--feedback-success)'
      )
    })
  })

  describe('if it contains unstaged changes', () => {
    it('should add style', async () => {
      ;(useUnstagedChanges as jest.Mock).mockReturnValue([[path], jest.fn()])

      await render(<Tab name={name} path={path} isDisabled={false} />)

      expect(screen.getByText(name)).toHaveStyleRule(
        'color',
        'var(--feedback-info)'
      )
    })
  })

  describe('if active', () => {
    it('should call setActivePath with the left tab if it exists', async () => {
      const tabs = new Set(['MOCK_PATH_LEFT', path, 'MOCK_PATH_RIGHT'])

      ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

      await render(<Tab name={name} path={path} isDisabled={false} />)

      await userEvent.click(screen.getByTitle('close'))

      expect(setActivePath).toBeCalledWith('MOCK_PATH_LEFT')
    })

    it('should call currentPathVar with the right tab if left does not exist', async () => {
      const tabs = new Set([path, 'MOCK_PATH_RIGHT'])

      ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

      await render(<Tab name={name} path={path} isDisabled={false} />)

      await userEvent.click(screen.getByTitle('close'))

      expect(setActivePath).toBeCalledWith('MOCK_PATH_RIGHT')
    })

    it('should call currentPathVar with the empty string if no left or right tab exist', async () => {
      const tabs = new Set([path])

      ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

      await render(<Tab name={name} path={path} isDisabled={false} />)

      await userEvent.click(screen.getByTitle('close'))

      expect(setActivePath).toBeCalledWith('')
    })
  })

  it('should remove itself from tabs', async () => {
    const tabs = new Set([path])

    ;(useTabs as jest.Mock).mockReturnValue([tabs, setTabs])

    await render(<Tab name={name} path={path} isDisabled={false} />)

    await userEvent.click(screen.getByTitle('close'))

    expect(setTabs).toBeCalledWith(new Set([]))
  })
})
