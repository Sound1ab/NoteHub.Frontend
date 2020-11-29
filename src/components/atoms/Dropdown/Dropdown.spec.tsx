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
      heading: 'MOCK_HEADING',
      icon: 'github',
      prefix: 'fab',
      label: 'label 1',
      onClick: mockItemOneOnClick,
      hasSeparator: true,
    } as const,
    {
      icon: 'sign-out-alt',
      prefix: 'fas',
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
    const { getByText, getByTitle, container } = await render(
      <Dropdown items={MOCK_ITEMS} />
    )

    for (const { label, onClick, hasSeparator, heading } of MOCK_ITEMS) {
      expect(getByText(label)).toBeInTheDocument()

      expect(getByTitle(`${label} icon`)).toBeInTheDocument()

      if (heading) {
        expect(getByText(heading)).toBeInTheDocument()
      }

      if (hasSeparator) {
        expect(container.querySelector('hr')).toBeInTheDocument()
      }

      await fireEvent.click(getByTitle(`${label} icon`))
      expect(onClick).toBeCalled()
    }
  })

  it('should disable clicks if item is disabled', async () => {
    const { getByText, getByTitle } = await render(
      <Dropdown items={[...MOCK_ITEMS, MOCK_DISABLED_ITEM]} />
    )

    const itemLabel = getByText(MOCK_DISABLED_ITEM.label)
    expect(itemLabel).toBeInTheDocument()

    const itemIcon = getByTitle(`${MOCK_DISABLED_ITEM.label} icon`)
    expect(itemIcon).toBeInTheDocument()

    await fireEvent.click(itemLabel)

    expect(MOCK_DISABLED_ITEM.onClick).not.toBeCalled()
  })

  it('should display custom items', async () => {
    const MockComponent = () => <div>MOCK_CUSTOM_ITEM</div>

    const { getByText } = await render(
      <Dropdown
        items={[
          {
            label: 'MOCK_LABEL',
            custom: <MockComponent />,
          },
        ]}
      />
    )

    expect(getByText('MOCK_CUSTOM_ITEM')).toBeInTheDocument()
  })
})
