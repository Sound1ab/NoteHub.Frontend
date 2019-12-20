import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { Input } from './Input'

describe('Input', () => {
  const value = 'MOCK_VALUE'
  const updatedValue = 'MOCK_UPDATED_VALUE'
  const name = 'MOCK_NAME'
  const aria = 'MOCK_ARIA'
  const onChange = jest.fn()

  it('should pass through name prop', () => {
    const {
      container: { firstChild },
    } = render(
      <Input value={value} name={name} onChange={onChange} aria={aria} />
    )

    expect(firstChild).toHaveAttribute('name', name)
    expect(firstChild).toHaveAttribute('value', value)
    expect(firstChild).toHaveAttribute('aria-label', aria)
  })

  it('should call on change with inputted text', () => {
    const { getByLabelText } = render(
      <Input value={value} name={name} onChange={onChange} aria={aria} />
    )

    const input = getByLabelText(aria)

    fireEvent.change(input, {
      target: { value: updatedValue },
    })

    expect(onChange).toBeCalled()
  })
})
