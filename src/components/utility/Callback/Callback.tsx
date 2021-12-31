import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useReadGithubUserAccessToken } from '../../../hooks/user/useReadGithubUserAccessToken'
import { localState } from '../../providers/ApolloProvider/cache'

export const Callback = () => {
  const { search } = useLocation()

  const params = new URLSearchParams(search)
  const code = params.get('code')
  const state = params.get('state')

  const { jwt } = useReadGithubUserAccessToken(code, state)

  if (jwt) {
    localState.currentJwtVar(jwt)

    return <Navigate to="/dashboard" />
  }

  return null
}
