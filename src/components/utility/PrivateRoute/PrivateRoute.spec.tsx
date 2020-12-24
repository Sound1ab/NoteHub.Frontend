import React, { ReactNode } from 'react'
import { Route } from 'react-router-dom'

import { render } from '../../../test-utils'
import { PrivateRoute } from './PrivateRoute'

jest.mock('react-router-dom', () => {
  const module = jest.requireActual('react-router-dom')

  return {
    ...module,
    Route: jest.fn(),
  }
})

describe('PrivateRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(Route as jest.Mock).mockImplementation(
      ({
        render,
      }: {
        render: ({ location }: { location: string }) => ReactNode
      }) => <div>{render && render({ location: 'mock' })}</div>
    )
  })

  it('should display child components if jwt is received', async () => {
    const { findByText } = await render(
      <PrivateRoute path="MOCK_PATH" exact={true}>
        <div>children</div>
      </PrivateRoute>
    )

    await expect(findByText('children')).resolves.toBeInTheDocument()
  })

  it('should retrn null if loading', async () => {
    const { container } = await render(
      <PrivateRoute path="MOCK_PATH" exact={true}>
        <div>children</div>
      </PrivateRoute>,
      { waitForLoad: true }
    )

    expect(container.firstChild).toBeNull()
  })
})
