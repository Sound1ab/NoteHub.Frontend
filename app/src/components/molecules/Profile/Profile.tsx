import React, { useEffect } from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Avatar, Heading, Icon } from '../../atoms'
import { useStore } from '../../../hooks'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import { username } from '../../../store'

const Style = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .Profile-name {
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
  }

  .Profile-avatar {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  .Profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .Profile-github {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

export function Profile() {
  const [state, dispatch] = useStore()
  const user = useReadGithubUser(state.user.username)

  useEffect(() => {
    dispatch(username((user && user.login) || ''))
  }, [user])

  return (
    <Style>
      <Avatar image="avatar.png" className="Profile-avatar" />
      <div className="Profile-details">
        <Heading color={COLOR.LIGHT} className="Profile-name" type="h4">
          {state.user.isAuthorized ? state.user.username : 'Authorize'}
        </Heading>
        <div className="Profile-github">
          <Icon icon="github" prefix="fab" marginRight />
          <Heading color={COLOR.LIGHT} type="h6">
            View Github
          </Heading>
        </div>
      </div>
    </Style>
  )
}
