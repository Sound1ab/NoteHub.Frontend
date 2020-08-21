import { useApolloClient } from '@apollo/react-hooks'
import { History, Location } from 'history'
import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { useReadGithubUserAccessToken } from '../../../hooks'

interface ICallback {
  location: Location
  history: History
}

export const Callback = withRouter(({ location }: ICallback) => {
  const client = useApolloClient()
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')

  const { jwt } = useReadGithubUserAccessToken(code, state)

  if (!jwt) {
    alert('There was a problem logging in, please try again')

    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    )
  }

  client.writeData({ data: { jwt } })

  return (
    <Redirect
      to={{
        pathname: '/dashboard',
      }}
    />
  )
})
