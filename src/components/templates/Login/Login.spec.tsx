import '@testing-library/jest-dom/extend-expect'

import { createMemoryHistory } from 'history'
import React from 'react'
import { Redirect, Router } from 'react-router-dom'

import { useLogin } from '../../../hooks'
import { cleanup, render } from '../../../test-utils'
import { localState } from '../../providers/ApolloProvider/cache'
import { Login } from './Login'

jest.mock('../../../hooks/authorization/useLogin')
jest.mock('react-router-dom', () => {
  const module = jest.requireActual('react-router-dom')

  return {
    ...module,
    Redirect: jest.fn(),
  }
})

afterEach(cleanup)

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(Redirect as jest.Mock).mockImplementation(() => <div>redirect</div>)
  })

  it('should return null if loading', async () => {
    ;(useLogin as jest.Mock).mockReturnValue({ jwt: null, loading: true })

    const {
      container: { firstChild },
    } = await render(<Login />)

    expect(firstChild).toBeNull()
  })

  it('should write jwt to client and redirect page if jwt is present', async () => {
    const history = createMemoryHistory()

    const currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
    const jwt = 'MOCK_JWT'
    ;(useLogin as jest.Mock).mockReturnValue({ jwt, loading: false })

    const { getByText } = await render(
      <Router history={history}>
        <Login />
      </Router>
    )

    expect(currentJwtVar).toBeCalledWith(jwt)
    expect(getByText('redirect')).toBeDefined()

    currentJwtVar.mockRestore()
  })

  it('should show login button if no jwt is present', async () => {
    ;(useLogin as jest.Mock).mockReturnValue({ jwt: null, loading: false })

    const { getByText } = await render(<Login />)

    expect(getByText('Log in with Github')).toBeDefined()
  })
})
