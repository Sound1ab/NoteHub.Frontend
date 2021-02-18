import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Spinner } from '../../atoms/Spinner/Spinner'
import { Callback } from '../Callback/Callback'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'

const Dashboard = lazy(() => import('../../templates/Dashboard/Dashboard'))
const Setup = lazy(() => import('../../templates/Setup/Setup'))
const LandingPage = lazy(
  () => import('../../templates/LandingPage/LandingPage')
)

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/setup" exact>
            <Setup />
          </PrivateRoute>
          <Route path="/callback" exact component={Callback} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
