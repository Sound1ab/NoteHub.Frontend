import React from 'react'

import { cleanup, fireEvent, render } from '../../../test-utils'
import { Dropdown } from './Dropdown'

afterEach(cleanup)

describe('Dropdown', () => {
  const mockItemOneOnClick = jest.fn()
  const mockItemTwoOnClick = jest.fn()

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

  it('should displays items and call on click handler for items', () => {
    const { getByText, getByTitle } = render(<Dropdown items={MOCK_ITEMS} />)

    for (const { label, onClick } of MOCK_ITEMS) {
      const itemLabel = getByText(label)
      expect(itemLabel).toBeDefined()

      const itemIcon = getByTitle(`${label} icon`)
      expect(itemIcon).toBeDefined()

      fireEvent.click(itemLabel)

      expect(onClick).toBeCalled()
    }
  })
})
