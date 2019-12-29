import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fireEvent, render } from '../../../test-utils'
import { Card } from './Card'

describe('Card', () => {
  const heading = 'MOCK_TITLE'
  const onClick = jest.fn()

  it('should display heading and call onclick handler', async () => {
    const { getByText } = await render(
      <Card heading={heading} onClick={onClick} isActive={false} />
    )

    const headingElement = getByText(heading)

    await fireEvent.click(headingElement)

    expect(onClick).toBeCalled()
  })

  it('should display renderInput if passed in and not heading', async () => {
    const { getByText, queryByText } = await render(
      <Card
        heading={heading}
        onClick={onClick}
        isActive={false}
        renderInput={<div>MOCK_INPUT</div>}
      />
    )

    expect(queryByText(heading)).toBeNull()
    expect(getByText('MOCK_INPUT')).toBeDefined()
  })
})
