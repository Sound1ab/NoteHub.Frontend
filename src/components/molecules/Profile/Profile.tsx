import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Avatar, Heading, Icon } from '../../atoms'

const Style = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .profile-avatar {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  .profile-profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile-github {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

export function Profile() {
  return (
    <Style>
      <Avatar className="profile-avatar" />
      <div className="profile-profile-details">
        <Heading color={COLOR.LIGHT} marginBottom type="h4">
          Phillip Parker
        </Heading>
        <div className="profile-github">
          <Icon icon="github" prefix="fab" marginRight />
          <Heading color={COLOR.LIGHT} type="h6">
            View Github
          </Heading>
        </div>
      </div>
    </Style>
  )
}
