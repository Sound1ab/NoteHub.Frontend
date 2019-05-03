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

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

export function Authorize() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
    >
      <Style>
        <Avatar image="avatar-placeholder.png" className="Authorize-avatar" />
        <div className="Authorize-details">
          <Heading color={COLOR.LIGHT} className="Authorize-name" type="h4">
            Authorize
          </Heading>
        </div>
      </Style>
    </a>
  )
}
