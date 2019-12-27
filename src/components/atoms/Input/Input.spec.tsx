import '@testing-library/jest-dom/extend-expect'

import React from 'react'

import { fireEvent, render } from '../../../test-utils'
import { Input } from './Input'

describe('Input', () => {
  const value = 'MOCK_VALUE'
  const updatedValue = 'MOCK_UPDATED_VALUE'
  const name = 'MOCK_NAME'
  const aria = 'MOCK_ARIA'
  const onChange = jest.fn()

  it('should pass through name prop', async () => {
    const {
      container: { firstChild },
    } = await render(
      <Input value={value} name={name} onChange={onChange} aria={aria} />
    )

    expect(firstChild).toHaveAttribute('name', name)
    expect(firstChild).toHaveAttribute('value', value)
    expect(firstChild).toHaveAttribute('aria-label', aria)
  })

  it('should call on change with inputted text', async () => {
    const { getByLabelText } = await render(
      <Input value={value} name={name} onChange={onChange} aria={aria} />
    )

    const input = getByLabelText(aria)

    await fireEvent.change(input, {
      target: { value: updatedValue },
    })

    expect(onChange).toBeCalled()
  })
})
