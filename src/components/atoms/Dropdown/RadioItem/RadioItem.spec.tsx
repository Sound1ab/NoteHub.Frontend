import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { render } from '../../../../test-utils'
import { RadioItem } from './RadioItem'

describe('RadioItem', () => {
  it('should display a checkbox', async () => {
    await render(
      <RadioItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={false}
        onChange={jest.fn()}
        title="MOCK_TITLE"
        group="MOCK GROUP"
      />
    )

    expect(screen.getByText('MOCK_LABEL')).toBeInTheDocument()
    expect(screen.getByRole('radio')).toBeInTheDocument()
  })

  it('should call onChange when checked', async () => {
    const onChange = jest.fn()

    await render(
      <RadioItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={false}
        onChange={onChange}
        title="MOCK_TITLE"
        group="MOCK GROUP"
      />
    )

    await userEvent.click(screen.getByRole('radio'))

    expect(onChange).toBeCalledWith('MOCK_VALUE')
  })

  it('should have a controlled checkbox', async () => {
    const { rerender } = await render(
      <RadioItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={false}
        onChange={jest.fn()}
        title="MOCK_TITLE"
        group="MOCK GROUP"
      />
    )

    expect(screen.getByRole('radio')).not.toBeChecked()

    await rerender(
      <RadioItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={true}
        onChange={jest.fn()}
        title="MOCK_TITLE"
        group="MOCK GROUP"
      />
    )

    expect(screen.getByRole('radio')).toBeChecked()
  })
})
