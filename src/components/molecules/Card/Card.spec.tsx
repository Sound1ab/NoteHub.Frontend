import { render, fireEvent } from '../../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Card } from './Card'

describe('Card', () => {
  const title = 'MOCK_TITLE'
  const onClick = jest.fn()

  it('should display heading and call onclick handler', () => {
    const { getByText } = render(
      <Card title={title} onClick={onClick} isSelected={false} />
    )

    const heading = getByText(title)

    fireEvent.click(heading)

    expect(onClick).toBeCalled()
  })
})
