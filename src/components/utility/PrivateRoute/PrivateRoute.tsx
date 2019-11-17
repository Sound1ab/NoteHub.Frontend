import React, { ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useLocalStorage } from '../../../hooks'
import { LOCAL_STORAGE } from '../../../enums'

interface IPrivateRoute {
  children: ReactNode
  path: string
  exact: boolean
}

export function PrivateRoute({ children, exact, path }: IPrivateRoute) {
  const [accessToken] = useLocalStorage(LOCAL_STORAGE.KEY)

  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        accessToken ? (
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
