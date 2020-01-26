import '@testing-library/jest-dom/extend-expect'

import { useApolloClient } from '@apollo/react-hooks'
import React, { FunctionComponent } from 'react'

import { useLogin } from '../../../hooks'
import { cleanup, render } from '../../../test-utils'
import { Login } from './Login'

jest.mock('../../../hooks/authorization/useLogin')
jest.mock('@apollo/react-hooks', () => {
  const originalModule = jest.requireActual('@apollo/react-hooks')

  return {
    ...originalModule,
    useApolloClient: jest.fn(),
  }
})
jest.mock('react-router-dom', () => {
  const location = {
    search: '?code=1234&state=state',
  }

  return {
    withRouter: (
      Component: FunctionComponent<{ location: typeof location }>
    ) => () => <Component location={location} />,
    Redirect: () => <div>redirect</div>,
  }
})

afterEach(cleanup)

describe('Login', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    const originalModule = jest.requireActual('@apollo/react-hooks')
    ;(useApolloClient as jest.Mock).mockImplementation(
      originalModule.useApolloClient
    )
  })

  it('should return null if loading', async () => {
    ;(useLogin as jest.Mock).mockReturnValue({ jwt: null, loading: true })

    const {
      container: { firstChild },
    } = await render(<Login />)

    expect(firstChild).toBeNull()
  })

  it('should write jwt to client and redirect page if jwt is present', async () => {
    const jwt = 'MOCK_JWT'
    const writeData = jest.fn()
    ;(useLogin as jest.Mock).mockReturnValue({ jwt, loading: false })
    ;(useApolloClient as jest.Mock).mockReturnValue({ writeData })

    const { getByText } = await render(<Login />)

    expect(writeData).toBeCalledWith({ data: { jwt } })
    expect(getByText('redirect')).toBeDefined()
  })

  it('should show login button if no jwt is present', async () => {
    ;(useLogin as jest.Mock).mockReturnValue({ jwt: null, loading: false })

    const { getByText } = await render(<Login />)

    expect(getByText('Log in with Github')).toBeDefined()
  })
})
