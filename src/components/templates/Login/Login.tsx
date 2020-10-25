import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useLogin } from '../../../hooks'
import { styled } from '../../../theme'
import { Icon } from '../../atoms'
import { localState } from '../../providers/ApolloProvider/cache'
import { LoginButton } from './LoginButton/LoginButton'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const SCOPE = process.env.REACT_APP_SCOPE

export function Login() {
  const { jwt, loading } = useLogin()

  useEffect(() => {
    if (!jwt) {
      return
    }

    localState.currentJwtVar(jwt)
  }, [jwt])

  if (loading) {
    return null
  }

  const state = Math.random().toString(36).substr(2)

  return jwt ? (
    <Redirect
      to={{
        pathname: '/dashboard',
      }}
    />
  ) : (
    <Wrapper>
      <LoginButton
        as="a"
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}&scope=${SCOPE}`}
        target="_self"
      >
        <Icon icon="github" prefix="fab" size="lg" marginRight />
        Log in with Github
      </LoginButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
