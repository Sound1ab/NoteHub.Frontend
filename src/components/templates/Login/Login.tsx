import React from 'react'
import { styled } from '../../../theme'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

const Style = styled.div`
  position: relative;
`

export function Login() {
  return (
    <Style>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
      >
        <button>LOGIN!</button>
      </a>
    </Style>
  )
}
