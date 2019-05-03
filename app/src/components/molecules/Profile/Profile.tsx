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
  const [, dispatch] = useStore()
  const user = useReadGithubUser()

  useEffect(() => {
    dispatch(username((user && user.login) || ''))
  }, [user])

  return (
    <Style>
      <Avatar
        image={(user && user.avatar_url) || 'avatar-placeholder.png'}
        className="Profile-avatar"
      />
      <div className="Profile-details">
        <Heading color={COLOR.LIGHT} className="Profile-name" type="h4">
          {user && user.login}
        </Heading>
        <div className="Profile-github">
          <Icon icon="github" prefix="fab" marginRight />
          <a
            href={(user && user.html_url) || '#'}
            target="_blank"
            rel="noopener"
          >
            <Heading color={COLOR.LIGHT} type="h6">
              View Github
            </Heading>
          </a>
        </div>
      </div>
    </Style>
  )
}
