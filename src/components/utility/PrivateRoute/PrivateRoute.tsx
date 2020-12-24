import React, { ReactNode, useEffect } from 'react'
import { Route } from 'react-router-dom'

import { useLogin, useReadJwt } from '../../../hooks'
import { localState } from '../../providers/ApolloProvider/cache'

export interface IPrivateRoute {
  children: ReactNode
  path: string
  exact: boolean
}

export function PrivateRoute({ children, exact, path }: IPrivateRoute) {
  const { jwt, loading } = useLogin()
  const savedJwt = useReadJwt()

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
