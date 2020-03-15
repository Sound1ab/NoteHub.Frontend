import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fireEvent, render } from '../../../test-utils'
import { ListItem } from './ListItem'

jest.mock('../../../hooks/Repo/useDeleteRepo')
jest.mock('../../../hooks/Repo/useUpdateRepo')

describe('ListItem', () => {
  const heading = 'MOCK_HEADING'
  const onClick = jest.fn()
  const dropdownItem = {
    icon: 'trash' as const,
    prefix: 'fa' as const,
    label: 'Delete repo',
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should call onClick when clicked', async () => {
    const { getByText } = await render(
      <ListItem
        isDisabled={false}
        isActive={false}
        onClick={onClick}
        heading={heading}
        dropdownItems={[dropdownItem]}
      />
    )

    await fireEvent.click(getByText(heading))

    expect(onClick).toBeCalled()
  })

  it('should display heading', async () => {
    const { getByText } = await render(
      <ListItem
        isDisabled={false}
        isActive={false}
        onClick={onClick}
        heading={heading}
        dropdownItems={[dropdownItem]}
      />
    )

    expect(getByText(heading)).toBeDefined()
  })

  it('should disabled click when passed isDisabled prop', async () => {
    const { getByText } = await render(
      <ListItem
        isDisabled={true}
        isActive={false}
        onClick={onClick}
        heading={heading}
        dropdownItems={[dropdownItem]}
      />
    )

    await fireEvent.click(getByText(heading))

    expect(onClick).not.toBeCalled()
  })

  it('should disable click when dropdown is open', async () => {
    const { getByText, getByLabelText } = await render(
      <ListItem
        isDisabled={true}
        isActive={false}
        onClick={onClick}
        heading={heading}
        dropdownItems={[dropdownItem]}
      />
    )

    await fireEvent.click(getByLabelText('dropdown'))

    await fireEvent.click(getByText(heading))

    expect(onClick).not.toBeCalled()
  })
})
