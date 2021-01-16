import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { render } from '../../../test-utils'
import { Button } from './Button'

describe('Button', () => {
  it('should show children', async () => {
    await render(<Button>click me</Button>)

    expect(screen.getByText('click me')).toBeInTheDocument()
  })

  it('should show loading if passed prop', async () => {
    await render(<Button isLoading>click me</Button>)

    expect(screen.getByTitle('loading spinner')).toBeInTheDocument()
  })

  it('should call onClick prop', async () => {
    const onClick = jest.fn()

    await render(<Button onClick={onClick}>click me</Button>)

    await userEvent.click(screen.getByText('click me'))

    expect(onClick).toBeCalled()
  })

  it('should add styles if disabled', async () => {
    await render(<Button isDisabled>click me</Button>)

    expect(screen.getByText('click me')).toHaveStyleRule(
      'cursor',
      'not-allowed'
    )
  })
})
