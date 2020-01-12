import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadIsNewRepoOpen } from '../../../hooks'
import { styled } from '../../../theme'
import { Heading, Icon } from '../../atoms'
import { Navigation, NewRepo, RepoInput } from '../../molecules'

const Style = styled.div`
  flex: 0 0 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.xs};
  overflow: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: sidebar;
    resize: horizontal;
    min-width: ${({ theme }) => theme.spacing.xl};
    max-width: 50vw;
  }

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
    font-weight: bold;
  }
`

export function Sidebar() {
  const { isNewRepoOpen } = useReadIsNewRepoOpen()

  return (
    <Style id={CONTAINER_ID.SIDEBAR}>
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
      {isNewRepoOpen && <RepoInput />}
      <Navigation />
      <NewRepo />
    </Style>
  )
}
