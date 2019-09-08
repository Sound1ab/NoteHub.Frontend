import { History, Location } from 'history'
import React from 'react'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import { LOCAL_STORAGE } from '../../../enums'
import { writeStorage } from '../../../hooks'
import { useReadGithubUserAccessToken } from '../../../hooks/user/useReadGithubUserAccessToken'
import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
`

interface ICallback {
  location: Location
  history: History
}

export const Callback = withRouter(({ location, history }: ICallback) => {
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')

  const accessToken = useReadGithubUserAccessToken(code, state)

  if (accessToken) {
    writeStorage(LOCAL_STORAGE.KEY, accessToken)
    history.push("/")
  }

  return <Style>Redirecting</Style>
})
