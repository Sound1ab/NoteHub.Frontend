import React from 'react'
import styled from 'styled-components'

import { GithubButton, Icon } from '../../atoms'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const SCOPE = process.env.REACT_APP_SCOPE

export function Login() {
  const state = Math.random().toString(36).substr(2)

  return (
    <Wrapper>
      <GithubButton
        as="a"
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}&scope=${SCOPE}`}
        target="_self"
      >
        <Icon icon="github" prefix="fab" size="lg" marginRight />
        Log in with Github
      </GithubButton>
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
