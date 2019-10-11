import React, { useEffect } from 'react'
import { useStore } from '../../../hooks'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import { username } from '../../../store'
import { styled } from '../../../theme'
import { Avatar } from '../../atoms'

const Style = styled.div`
  display: flex;

  .Profile-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Profile-avatar {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const STATE = process.env.REACT_APP_STATE
const SCOPE = process.env.REACT_APP_SCOPE

export function Profile() {
  const [state, dispatch] = useStore()
  const user = useReadGithubUser()

  useEffect(() => {
    if (state.user.username || !user) {
      return
    }
    dispatch(username((user && user.login) || ''))
  }, [user, state.user.username, dispatch])

  const isAuthorized = state.user.isAuthorized

  return (
    <Style>
      {isAuthorized ? (
        <div className="Profile-wrapper">
          <Avatar className="Profile-avatar" image={user && user.avatar_url} />
        </div>
      ) : (
        <a
          className="Profile-wrapper"
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${STATE}&scope=${SCOPE}`}
        >
          <Avatar className="Profile-avatar" />
        </a>
      )}
    </Style>
  )
}
