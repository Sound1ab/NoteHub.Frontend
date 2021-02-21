import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { ConnectRepo } from '../../templates/Dashboard/ConnectRepo/ConnectRepo'

export function ModalSwitch() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/connect-repo`}>
        <ConnectRepo />
      </Route>
    </Switch>
  )
}
