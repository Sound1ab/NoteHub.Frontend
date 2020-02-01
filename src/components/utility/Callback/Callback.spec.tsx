import '@testing-library/jest-dom/extend-expect'

import React, { FunctionComponent } from 'react'

import { useReadGithubUserAccessToken } from '../../../hooks'
import { cleanup, render } from '../../../test-utils'
import { Callback } from './Callback'

jest.mock('../../../hooks/user/useReadGithubUserAccessToken')
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

describe('Callback', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('should parse query parameters and pass code and state to query', async () => {
    await render(<Callback />)

    expect(useReadGithubUserAccessToken).toBeCalledWith('1234', 'state')
  })

  it('should redirect dashboard if a jwt if received', async () => {
    ;(useReadGithubUserAccessToken as jest.Mock).mockReturnValue('MOCK_JWT')
    const { getByText } = await render(<Callback />)

    expect(getByText('redirect')).toBeDefined()
  })

  it('should return null if no jwt is received', async () => {
    ;(useReadGithubUserAccessToken as jest.Mock).mockReturnValue(null)
    const {
      container: { firstChild },
    } = await render(<Callback />)

    expect(firstChild).toBeNull()
  })
})