import { History, Location } from 'history'
import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { useReadGithubUserAccessToken } from '../../../hooks'
import { currentJwtVar } from '../../providers/ApolloProvider/cache'

interface ICallback {
  location: Location
  history: History
}

export const Callback = withRouter(({ location }: ICallback) => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')

  const { jwt } = useReadGithubUserAccessToken(code, state)

  if (jwt) {
    currentJwtVar(jwt)

    return (
      <Redirect
        to={{
          pathname: '/dashboard',
        }}
      />
    )
  }

  return null
})
