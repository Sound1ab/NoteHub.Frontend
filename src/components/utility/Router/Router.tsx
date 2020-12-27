import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Callback, PrivateRoute } from '..'

const Dashboard = lazy(() => import('../../templates/Dashboard/Dashboard'))
const Setup = lazy(() => import('../../templates/Setup/Setup'))
const LandingPage = lazy(
  () => import('../../templates/LandingPage/LandingPage')
)

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <PrivateRoute path="/dashboard" exact>
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
