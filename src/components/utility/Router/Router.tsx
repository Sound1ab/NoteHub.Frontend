import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Dashboard, Login, Setup } from '../../templates'
import { Callback, PrivateRoute } from '..'

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/dashboard" exact>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/setup" exact>
          <Setup />
        </PrivateRoute>
        <Route path="/callback" exact component={Callback} />
      </Switch>
    </BrowserRouter>
  )
}
