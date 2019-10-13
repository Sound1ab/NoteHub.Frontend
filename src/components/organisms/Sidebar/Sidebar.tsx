import React from 'react'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'
import { Navigation, NewRepo } from '../../molecules'

const Style = styled.div`
  grid-area: sidebar;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.xs};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  .Sidebar-title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  .Sidebar-title-icon {
    color: ${({ theme }) => theme.colors.accent};
  }

  .Sidebar-title-heading {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

export function Sidebar() {
  return (
    <Style>
      <div className="Sidebar-title-wrapper">
        <Icon
          className="Sidebar-title-icon"
          icon="book"
          prefix="fa"
          marginRight
        />
        <Heading
          className="Sidebar-title-heading"
          type="h4"
          textTransform="uppercase"
        >
          Repos
        </Heading>
      </div>
      <Navigation />
      <NewRepo />
    </Style>
  )
}