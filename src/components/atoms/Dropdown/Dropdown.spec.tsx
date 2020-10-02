import React from 'react'

import { cleanup, fireEvent, render } from '../../../test-utils'
import { Dropdown } from './Dropdown'

afterEach(cleanup)

describe('Dropdown', () => {
  const mockItemOneOnClick = jest.fn()
  const mockItemTwoOnClick = jest.fn()
  const mockItemThreeOnClick = jest.fn()

  const MOCK_ITEMS = [
    {
      icon: 'github',
      prefix: 'fab',
      label: 'label 1',
      onClick: mockItemOneOnClick,
    } as const,
    {
      icon: 'sign-out-alt',
      prefix: 'fa',
      label: 'label 2',
      onClick: mockItemTwoOnClick,
    } as const,
  ]

  const MOCK_DISABLED_ITEM = {
    icon: 'github',
    prefix: 'fab',
    label: 'label 3',
    onClick: mockItemThreeOnClick,
    isDisabled: true,
  } as const

  it('should displays items and call on click handler for items', async () => {
    const { getByText, getByTitle } = await render(
      <Dropdown items={MOCK_ITEMS} />
    )

    for (const { label, onClick } of MOCK_ITEMS) {
      const itemLabel = getByText(label)
      expect(itemLabel).toBeDefined()

      const itemIcon = getByTitle(`${label} icon`)
      expect(itemIcon).toBeDefined()

      await fireEvent.click(itemLabel)

      expect(onClick).toBeCalled()
    }
  })

  it('should disable clicks if item is disabled', async () => {
    const { getByText, getByTitle } = await render(
      <Dropdown items={[...MOCK_ITEMS, MOCK_DISABLED_ITEM]} />
    )

    const itemLabel = getByText(MOCK_DISABLED_ITEM.label)
    expect(itemLabel).toBeDefined()

    const itemIcon = getByTitle(`${MOCK_DISABLED_ITEM.label} icon`)
    expect(itemIcon).toBeDefined()

    await fireEvent.click(itemLabel)

    expect(MOCK_DISABLED_ITEM.onClick).not.toBeCalled()
  })
})
