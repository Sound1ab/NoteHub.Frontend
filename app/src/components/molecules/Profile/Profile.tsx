import React, { useEffect } from 'react'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { useReadGithubUser } from '../../../hooks/user/useReadGithubUser'
import { username } from '../../../store'
import { styled } from '../../../theme'
import { Avatar, Heading, Icon } from '../../atoms'

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
  const user = useReadGithubUser()

  useEffect(() => {
    if (state.user.username || !user) {
      return
    }
    dispatch(username((user && user.login) || ''))
  }, [user, state.user.username, dispatch])

  return (
    <a
      href={(user && user.html_url) || '#'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Style>
        <Avatar image={user && user.avatar_url} className="Profile-avatar" />
        <div className="Profile-details">
          <Heading color={COLOR.DARK} className="Profile-name" type="h4">
            {user && user.login}
          </Heading>
          <div className="Profile-github">
            <Icon icon="github" prefix="fab" marginRight />
            <Heading color={COLOR.DARK} type="h6">
              View Github
            </Heading>
          </div>
        </div>
      </Style>
    </a>
  )
}
