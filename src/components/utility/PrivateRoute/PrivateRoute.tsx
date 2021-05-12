import React, { ReactNode, useEffect } from 'react'
import { Route } from 'react-router-dom'

import { useLogin } from '../../../hooks/authorization/useLogin'
import { useReadJwt } from '../../../hooks/localState/useReadJwt'
import { localState } from '../../providers/ApolloProvider/cache'

export interface IPrivateRoute {
  children: ReactNode
  path: string
  exact?: boolean
}

export function PrivateRoute({ children, exact, path }: IPrivateRoute) {
  const { jwt, loading } = useLogin()
  const savedJwt = useReadJwt()

  console.log('here', jwt)

  useEffect(() => {
    if (!jwt) {
      return
    }

    localState.currentJwtVar(jwt)
  }, [jwt])

  if (loading) {
    return null
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (savedJwt ? children : null)}
    />
  )
}
