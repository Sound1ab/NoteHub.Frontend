import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Callback, PrivateRoute } from '..'
import { Dashboard, Login } from '../../templates'

export function Router() {
  return (
    <BrowserRouter>
      <>
        <PrivateRoute path="/dashboard" exact>
          <Dashboard />
        </PrivateRoute>
        <Route path="/" exact component={Login} />
        <Route path="/callback" exact component={Callback} />
      </>
    </BrowserRouter>
  )
}
