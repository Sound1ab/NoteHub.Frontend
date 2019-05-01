import React from 'react'
import { COLOR } from '../../../enums'
import { styled } from '../../../theme'
import { Avatar, Heading, Icon } from '../../atoms'

const Style = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.m};

  .name {
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
  }

  .avatar {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .github {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

export function Profile() {
  return (
    <Style>
      <Avatar image="avatar.png" className="avatar" />
      <div className="details">
        <Heading color={COLOR.LIGHT} className="name" type="h4">
          Phillip Parker
        </Heading>
        <div className="github">
          <Icon icon="github" prefix="fab" marginRight />
          <Heading color={COLOR.LIGHT} type="h6">
            View Github
          </Heading>
        </div>
      </div>
    </Style>
  )
}
