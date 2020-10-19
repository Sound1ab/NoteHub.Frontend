import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useReadJwt } from '../../../hooks'

export interface IPrivateRoute {
  children: ReactNode
  path: string
  exact: boolean
}

export function PrivateRoute({ children, exact, path }: IPrivateRoute) {
  const currentJwt = useReadJwt()

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        currentJwt ? (
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
