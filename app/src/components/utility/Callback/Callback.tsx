import { Location } from 'history'
import React from 'react'
import { Redirect } from 'react-router'
import { LOCAL_STORAGE } from '../../../enums'
import { useStore } from '../../../hooks'
import { useReadGithubUserAccessToken } from '../../../hooks/user/useReadGithubUserAccessToken'
import { LocalStorage } from '../../../services/LocalStorage'
import { isAuthorized } from '../../../store'
import { styled } from '../../../theme'

const Style = styled.div`
  position: relative;
`

interface ICallback {
  location: Location
}

export function Callback({ location }: ICallback) {
  const [, dispatch] = useStore()
  const params = new URLSearchParams(location.search)
  const code = params.get('code')
  const state = params.get('state')

  const accessToken = useReadGithubUserAccessToken(code, state)

  if (accessToken) {
    LocalStorage.setItem(LOCAL_STORAGE.KEY, accessToken)
    dispatch(isAuthorized(true))
    return <Redirect to="/" push={true} />
  }

  return <Style>Redirecting</Style>
}
