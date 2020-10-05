import { useApolloClient } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useLogin } from '../../../hooks'
import { styled } from '../../../theme'
import { Button, Icon } from '../../atoms'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

export function Login() {
  const client = useApolloClient()
  const { jwt, loading } = useLogin()

  useEffect(() => {
    if (!jwt) {
      return
    }

    client.writeData({ data: { jwt } })
  }, [client, jwt])

  if (loading) {
    return null
  }

  return jwt ? (
    <Redirect
      to={{
        pathname: '/dashboard',
      }}
    />
  ) : (
    <Wrapper>
      <Button
        as="a"
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
        target="_self"
      >
        <Icon icon="github" prefix="fab" size="lg" marginRight />
        Log in with Github
      </Button>
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
