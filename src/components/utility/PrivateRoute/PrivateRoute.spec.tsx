import '@testing-library/jest-dom/extend-expect'

import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useReadJwt } from '../../../hooks'
import { cleanup, render } from '../../../test-utils'
import { PrivateRoute } from './PrivateRoute'

jest.mock('../../../hooks/localState/useReadJwt')
jest.mock('react-router-dom', () => {
  const module = jest.requireActual('react-router-dom')

  return {
    ...module,
    Redirect: jest.fn(),
    Route: jest.fn(),
  }
})

afterEach(cleanup)

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
    ;(Redirect as jest.Mock).mockImplementation(() => <div>redirect</div>)
  })

  it('should display children if jwt is present', async () => {
    ;(useReadJwt as jest.Mock).mockReturnValue('MOCK_JWT')

    const { getByText } = await render(
      <PrivateRoute path="MOCK_PATH" exact={true}>
        <div>children</div>
      </PrivateRoute>
    )

    expect(getByText('children')).toBeDefined()
  })

  it('should redirect if jwt is not present', async () => {
    ;(useReadJwt as jest.Mock).mockReturnValue(null)

    const { getByText } = await render(
      <PrivateRoute path="MOCK_PATH" exact={true}>
        <div>children</div>
      </PrivateRoute>
    )

    expect(getByText('redirect')).toBeDefined()
  })
})
