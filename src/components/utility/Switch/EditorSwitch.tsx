import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import { SlateValueProvider } from '../../providers/SlateValueProvider/SlateValueProvider'
import { Configuration } from '../../templates/Dashboard/Configuration/Configuration'
import { Repos } from '../../templates/Dashboard/Configuration/Repos/Repos'
import { Settings } from '../../templates/Dashboard/Configuration/Settings/Settings'
import { TextCheck } from '../../templates/Dashboard/Configuration/TextCheck/TextCheck'
import { Editor } from '../../templates/Dashboard/Editor/Editor'

export function EditorSwitch() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/settings`}>
        <Configuration>
          <Settings />
        </Configuration>
      </Route>
      <Route path={`${path}/text-check`}>
        <Configuration>
          <TextCheck />
        </Configuration>
      </Route>
      <Route path={`${path}/repos`}>
        <Configuration>
          <Repos />
        </Configuration>
      </Route>
      <Route path={path}>
        <SlateValueProvider>
          <Editor />
        </SlateValueProvider>
      </Route>
    </Switch>
  )
}
