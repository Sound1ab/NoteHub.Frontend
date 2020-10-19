import '@testing-library/jest-dom/extend-expect'
import React, { FunctionComponent } from 'react'

import { useLogin } from '../../../hooks'
import { cleanup, render } from '../../../test-utils'
import { Login } from './Login'
import { localState } from '../../providers/ApolloProvider/cache'

jest.mock('../../../hooks/authorization/useLogin')
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
  })

  it('should return null if loading', async () => {
    ;(useLogin as jest.Mock).mockReturnValue({ jwt: null, loading: true })

    const {
      container: { firstChild },
    } = await render(<Login />)

    expect(firstChild).toBeNull()
  })

  it('should write jwt to client and redirect page if jwt is present', async () => {
    const currentJwtVar = jest.spyOn(localState, 'currentJwtVar')
    const jwt = 'MOCK_JWT'
    ;(useLogin as jest.Mock).mockReturnValue({ jwt, loading: false })

    const { getByText } = await render(<Login />)

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
