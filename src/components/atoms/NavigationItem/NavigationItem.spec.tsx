import { render, fireEvent } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { NavigationItem } from './NavigationItem'

describe('NavigationItem', () => {
  const heading = 'MOCK_HEADING'
  const onClick = jest.fn()

  it('should call onClick when clicked', () => {
    const { getByText } = render(
      <NavigationItem
        heading={heading}
        isActive={false}
        isPrivate={false}
        onClick={onClick}
      />
    )

    fireEvent.click(getByText(heading))

    expect(onClick).toBeCalled()
  })

  it('should display private icon if item is private', () => {
    const { getByTitle } = render(
      <NavigationItem
        heading={heading}
        isActive={false}
        isPrivate={true}
        onClick={onClick}
      />
    )

    expect(getByTitle(`${heading} is a private repo`)).toBeDefined()
  })

  it('should display heading', () => {
    const { getByText } = render(
      <NavigationItem
        heading={heading}
        isActive={false}
        isPrivate={false}
        onClick={onClick}
      />
    )

    expect(getByText(heading)).toBeDefined()
  })
})
