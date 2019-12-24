import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fireEvent, render } from '../../../test-utils'
import { Card } from './Card'

describe('Card', () => {
  const title = 'MOCK_TITLE'
  const onClick = jest.fn()

  it('should display heading and call onclick handler', () => {
    const { getByText } = render(
      <Card heading={title} onClick={onClick} isActive={false} />
    )

    const heading = getByText(title)

    fireEvent.click(heading)

    expect(onClick).toBeCalled()
  })
})
