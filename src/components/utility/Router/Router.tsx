import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Callback } from '..'
import { Editor } from '../../templates'

export function Router() {
  return (
    <BrowserRouter>
      <>
        <Route path="/" exact component={Editor} />
        <Route path="/callback" exact component={Callback} />
      </>
    </BrowserRouter>
  )
}
