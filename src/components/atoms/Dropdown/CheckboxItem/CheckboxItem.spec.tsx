import { screen } from '@testing-library/react'
import React from 'react'

import { fireEvent, render } from '../../../../test-utils'
import { CheckboxItem } from './CheckboxItem'

describe('CheckboxItem', () => {
  it('should display a checkbox', async () => {
    await render(
      <CheckboxItem
        label="MOCK_LABEL"
        value={true}
        checked={false}
        onChange={jest.fn()}
        title="MOCK_TITLE"
      />
    )

    expect(screen.getByText('MOCK_LABEL')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('should call onChange when checked', async () => {
    const onChange = jest.fn()

    await render(
      <CheckboxItem
        label="MOCK_LABEL"
        value={true}
        checked={false}
        onChange={onChange}
        title="MOCK_TITLE"
      />
    )

    await fireEvent.click(screen.getByTitle('MOCK_TITLE'))

    expect(onChange).toBeCalledWith(true)
  })

  it('should have a controlled checkbox', async () => {
    const { rerender } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        value={true}
        checked={false}
        onChange={jest.fn()}
        title="MOCK_TITLE"
      />
    )

    expect(screen.getByRole('checkbox')).not.toBeChecked()

    await rerender(
      <CheckboxItem
        label="MOCK_LABEL"
        value={false}
        checked={true}
        onChange={jest.fn()}
        title="MOCK_TITLE"
      />
    )

    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
