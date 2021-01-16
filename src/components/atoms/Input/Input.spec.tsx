import { screen } from '@testing-library/react'
import React from 'react'

import { fireEvent, render } from '../../../test-utils'
import { Input } from './Input'

describe('InlineInput', () => {
  const value = 'MOCK_VALUE'
  const clickOutsideCallback = jest.fn()
  const handleOnChange = jest.fn()
  const inputAriaLabel = 'MOCK_INPUT_ARIA_LABEL'
  const onSubmit = jest.fn()
  const formAriaLabel = 'MOCK_WRAPPER_ARIA_LABEL'
  const icon = <div>MOCK_ICON</div>

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should fire callback when user clicks off input', async () => {
    const { container } = await render(
      <Input
        value={value}
        clickOutsideCallback={clickOutsideCallback}
        handleOnChange={handleOnChange}
        inputAriaLabel={inputAriaLabel}
        onSubmit={onSubmit}
        formAriaLabel={formAriaLabel}
        icon={icon}
        type="text"
      />
    )

    await fireEvent.mouseDown(container)

    expect(clickOutsideCallback).toBeCalled()
  })

  it('should fire callback when user presses escape', async () => {
    await render(
      <Input
        value={value}
        clickOutsideCallback={clickOutsideCallback}
        handleOnChange={handleOnChange}
        inputAriaLabel={inputAriaLabel}
        onSubmit={onSubmit}
        formAriaLabel={formAriaLabel}
        icon={icon}
        type="text"
      />
    )

    await fireEvent.keyDown(screen.getByLabelText(inputAriaLabel), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    })

    expect(clickOutsideCallback).toBeCalled()
  })

  it('should focus the input when first rendered', async () => {
    await render(
      <Input
        value={value}
        clickOutsideCallback={clickOutsideCallback}
        handleOnChange={handleOnChange}
        inputAriaLabel={inputAriaLabel}
        onSubmit={onSubmit}
        formAriaLabel={formAriaLabel}
        icon={icon}
        type="text"
        autoFocus
      />
    )

    expect(screen.getByLabelText(inputAriaLabel)).toHaveFocus()
  })

  it('should display icon if passed as prop', async () => {
    await render(
      <Input
        value={value}
        clickOutsideCallback={clickOutsideCallback}
        handleOnChange={handleOnChange}
        inputAriaLabel={inputAriaLabel}
        onSubmit={onSubmit}
        formAriaLabel={formAriaLabel}
        icon={icon}
        type="text"
      />
    )

    expect(screen.getByText('MOCK_ICON')).toBeDefined()
  })
})
