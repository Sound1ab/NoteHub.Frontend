import { useReactiveVar } from '@apollo/client'
import React, { ReactNode } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { currentJwtVar } from '../../providers/ApolloProvider/cache'

export interface IPrivateRoute {
  children: ReactNode
  path: string
  exact: boolean
}

export function PrivateRoute({ children, exact, path }: IPrivateRoute) {
  const currentJwt = useReactiveVar(currentJwtVar)

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
