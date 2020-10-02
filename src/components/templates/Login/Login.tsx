import { useApolloClient } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { useLogin } from '../../../hooks'
import { styled } from '../../../theme'
import { ButtonLink, Icon } from '../../atoms'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

const Style = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .Login-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.company.github};
    color: #fff;

    * svg {
      color: #fff;
    }
  }
`

export function Login() {
  const client = useApolloClient()
  const { jwt, loading } = useLogin()

  useEffect(() => {
    if (!jwt) {
      return
    }

    client.writeData({ data: { jwt } })
  }, [jwt])

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
    <Style>
      <ButtonLink
        className="Login-button"
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
      >
        <Icon icon="github" prefix="fab" size="lg" marginRight />
        Log in with Github
      </ButtonLink>
    </Style>
  )
}
