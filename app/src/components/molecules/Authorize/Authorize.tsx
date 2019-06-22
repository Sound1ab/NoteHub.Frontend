import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Avatar, Heading } from '../../atoms'

const Style = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .Authorize-name {
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
  }

  .Authorize-avatar {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  .Authorize-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .Authorize-github {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

const isDev = process.env.NODE_ENV === 'development'

const CLIENT_ID = isDev
  ? process.env.REACT_APP_CLIENT_ID_DEV
  : process.env.REACT_APP_CLIENT_ID_PROD
const REDIRECT_URL = isDev
  ? process.env.REACT_APP_REDIRECT_URL_DEV
  : process.env.REACT_APP_REDIRECT_URL_PROD
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

export function Authorize() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
    >
      <Style>
        <Avatar className="Authorize-avatar" />
        <div className="Authorize-details">
          <Heading color={COLOR.DARK} className="Authorize-name" type="h4">
            Authorize
          </Heading>
        </div>
      </Style>
    </a>
  )
}
