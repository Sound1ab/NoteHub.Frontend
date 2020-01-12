import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useReadIsAuthorised } from '../../../hooks'

interface IPrivateRoute {
  children: ReactNode
  path: string
  exact: boolean
}

export function PrivateRoute({ children, exact, path }: IPrivateRoute) {
  const { isAuthorised } = useReadIsAuthorised()

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        isAuthorised ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
