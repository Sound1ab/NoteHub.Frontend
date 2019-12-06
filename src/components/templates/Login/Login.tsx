import React from 'react'
import { styled } from '../../../theme'
import { useLocalStorage } from '../../../hooks'
import { LOCAL_STORAGE } from '../../../enums'
import { Redirect } from 'react-router-dom'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

console.log('CLIENT_ID', CLIENT_ID)

const Style = styled.div`
  position: relative;
`

export function Login() {
  const [accessToken] = useLocalStorage(LOCAL_STORAGE.KEY)

  return accessToken ? (
    <Redirect
      to={{
        pathname: '/dashboard',
      }}
    />
  ) : (
    <Style>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
      >
        <button>LOGIN!</button>
      </a>
    </Style>
  )
}
