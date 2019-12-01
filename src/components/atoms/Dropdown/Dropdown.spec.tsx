import 'jest-dom/extend-expect'
import React from 'react'
import { cleanup, render } from '../../../test-utils'
import { Dropdown } from './Dropdown'

jest.mock('monaco-editor')

afterEach(cleanup)

describe('Dropdown', () => {
  it('should displays items', () => {
    const MOCK_ITEMS = [
      {
        icon: 'github',
        prefix: 'fab',
        label: 'label 1',
        onClick: jest.fn(),
      } as const,
      {
        icon: 'sign-out-alt',
        prefix: 'fa',
        label: 'label 2',
        onClick: jest.fn(),
      } as const,
    ]

    const { getByText, getByTitle } = render(<Dropdown items={MOCK_ITEMS} />)

    MOCK_ITEMS.forEach(({ label }) => {
      const itemLabel = getByText(label)
      expect(itemLabel).toBeDefined()

      const itemIcon = getByTitle(`${label} icon`)
      expect(itemIcon).toBeDefined()
    })
  })
})
