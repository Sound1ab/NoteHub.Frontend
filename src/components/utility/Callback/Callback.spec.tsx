import '@testing-library/jest-dom/extend-expect'

import { createMemoryHistory } from 'history'
import React from 'react'
import { Redirect, Router, useLocation } from 'react-router-dom'

import { useReadGithubUserAccessToken } from '../../../hooks/user/useReadGithubUserAccessToken'
import { cleanup, render } from '../../../test-utils'
import { Callback } from './Callback'

jest.mock('../../../hooks/user/useReadGithubUserAccessToken')
jest.mock('react-router-dom', () => {
  const module = jest.requireActual('react-router-dom')

  return {
    ...module,
    useLocation: jest.fn(),
    Redirect: jest.fn(),
  }
})

afterEach(cleanup)

describe('Callback', () => {
  const history = createMemoryHistory()

  beforeEach(() => {
    jest.restoreAllMocks()
    ;(useReadGithubUserAccessToken as jest.Mock).mockReturnValue({
      __typename: 'MOCK_TYPENAME',
      jwt: 'MOCK_JWT',
      error: undefined,
    })
    ;(Redirect as jest.Mock).mockImplementation(() => <div>redirect</div>)
    ;(useLocation as jest.Mock).mockImplementation(() => ({
      search: '?code=1234&state=state',
    }))
  })

  it('should parse query parameters and pass code and state to query', async () => {
    await render(
      <Router history={history}>
        <Callback />
      </Router>
    )

    expect(useReadGithubUserAccessToken).toBeCalledWith('1234', 'state')
  })

  it('should redirect dashboard if a jwt if received', async () => {
    const { getByText } = await render(
      <Router history={history}>
        <Callback />
      </Router>
    )

    expect(getByText('redirect')).toBeDefined()
  })
})
