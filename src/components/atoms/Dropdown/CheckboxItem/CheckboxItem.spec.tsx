import React from 'react'

import { cleanup, fireEvent, render } from '../../../../test-utils'
import { CheckboxItem } from './CheckboxItem'

afterEach(cleanup)

describe('CheckboxItem', () => {
  it('should display a checkbox', async () => {
    const { getByText, getByTitle } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        name="MOCK_NAME"
        checked={false}
        onChange={jest.fn()}
      />
    )

    expect(getByText('MOCK_LABEL')).toBeInTheDocument()
    expect(getByTitle('MOCK_NAME checkbox')).toBeInTheDocument()
  })

  it('should call onChange when checked', async () => {
    const onChange = jest.fn()

    const { getByTitle } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        name="MOCK_NAME"
        checked={false}
        onChange={onChange}
      />
    )

    await fireEvent.click(getByTitle('MOCK_NAME checkbox'))

    expect(onChange).toBeCalledWith('MOCK_NAME')
  })

  it('should have a controlled checkbox', async () => {
    const { getByTitle, rerender } = await render(
      <CheckboxItem
        label="MOCK_LABEL"
        name="MOCK_NAME"
        checked={false}
        onChange={jest.fn()}
      />
    )

    expect(getByTitle('MOCK_NAME checkbox')).not.toBeChecked()

    await rerender(
      <CheckboxItem
        label="MOCK_LABEL"
        name="MOCK_NAME"
        checked={true}
        onChange={jest.fn()}
      />
    )

    expect(getByTitle('MOCK_NAME checkbox')).toBeChecked()
  })
})
