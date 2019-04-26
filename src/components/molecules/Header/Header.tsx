import React from 'react'
import { styled } from '../../../theme'
import { Avatar, Heading, Icon } from '../../atoms'
import { ICON_COLOR } from '../../../enums'

const Style = styled.header`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.s};
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background.tertiary};
  
  .header-avatar {
    margin-right: ${({theme}) => theme.spacing.xs};
  }
  
  .header-profile {
    display: flex;
  }
  
  .header-profile-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .header-github {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

export function Header() {
  return (
    <Style>
      <div className="header-profile">
        <Avatar className="header-avatar" />
        <div className="header-profile-details">
          <Heading type="h4">Phillip Parker</Heading>
          <div className="header-github">
            <Icon
              color={ICON_COLOR.DARK}
              icon="github"
              prefix="fab"
              marginRight
            />
            <Heading type="h6">View Github</Heading>
          </div>
        </div>
      </div>
    </Style>
  )
}
