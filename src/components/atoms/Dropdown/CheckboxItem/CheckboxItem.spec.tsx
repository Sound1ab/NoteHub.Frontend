import React from 'react'

import { cleanup, fireEvent, render } from '../../../../test-utils'
import { CheckboxItem } from './CheckboxItem'

afterEach(cleanup)

describe('CheckboxItem', () => {
  it('should display a checkbox', async () => {
    const { getByText, getByRole } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={false}
        onChange={jest.fn()}
        title="MOCK_TITLE"
      />
    )

    expect(getByText('MOCK_LABEL')).toBeInTheDocument()
    expect(getByRole('checkbox')).toBeInTheDocument()
  })

  it('should call onChange when checked', async () => {
    const onChange = jest.fn()

    const { getByTitle } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={false}
        onChange={onChange}
        title="MOCK_TITLE"
      />
    )

    await fireEvent.click(getByTitle('MOCK_TITLE'))

    expect(onChange).toBeCalledWith('MOCK_VALUE')
  })

  it('should have a controlled checkbox', async () => {
    const { rerender, getByRole } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={false}
        onChange={jest.fn()}
        title="MOCK_TITLE"
      />
    )

    expect(getByRole('checkbox')).not.toBeChecked()

    await rerender(
      <CheckboxItem
        label="MOCK_LABEL"
        value="MOCK_VALUE"
        checked={true}
        onChange={jest.fn()}
        title="MOCK_TITLE"
      />
    )

    expect(getByRole('checkbox')).toBeChecked()
  })
})
