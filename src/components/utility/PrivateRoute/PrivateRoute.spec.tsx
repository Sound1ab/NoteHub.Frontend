import '@testing-library/jest-dom/extend-expect'

import React, { FunctionComponent } from 'react'

import { useReadJwt } from '../../../hooks'
import { cleanup, render } from '../../../test-utils'
import { PrivateRoute } from './PrivateRoute'

jest.mock('../../../hooks/localState/useReadJwt')
jest.mock('react-router-dom', () => {
  const location = {
    search: '?code=1234&state=state',
  }

  return {
    withRouter: (
      Component: FunctionComponent<{ location: typeof location }>
    ) => () => <Component location={location} />,
    Redirect: () => <div>redirect</div>,
    Route: ({ render }: any) => (
      <div>{render && render({ location: 'mock' })}</div>
    ),
  }
})

afterEach(cleanup)

describe('PrivateRoute', () => {
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
