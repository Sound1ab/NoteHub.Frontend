import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Spinner } from '../../atoms/Spinner/Spinner'
import { SlateValueProvider } from '../../providers/SlateValueProvider/SlateValueProvider'
import { Configuration } from '../../templates/Dashboard/Configuration/Configuration'
import { Repos } from '../../templates/Dashboard/Configuration/Repos/Repos'
import { Settings } from '../../templates/Dashboard/Configuration/Settings/Settings'
import { ConnectRepo } from '../../templates/Dashboard/ConnectRepo/ConnectRepo'
import { Editor } from '../../templates/Dashboard/Editor/Editor'
import { Callback } from '../Callback/Callback'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'

const Dashboard = lazy(() => import('../../templates/Dashboard/Dashboard'))
const LandingPage = lazy(
  () => import('../../templates/LandingPage/LandingPage')
)

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={
                <SlateValueProvider>
                  <Editor />
                </SlateValueProvider>
              }
            />
            <Route
              path="repos"
              element={
                <Configuration>
                  <Repos />
                </Configuration>
              }
            >
              <Route path="connect-repo" element={<ConnectRepo />} />
            </Route>
            <Route
              path="settings"
              element={
                <Configuration>
                  <Settings />
                </Configuration>
              }
            />
          </Route>
          <Route path="callback" element={<Callback />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
