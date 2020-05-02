import React from 'react'

import { CONTAINER_ID } from '../../../enums'
import { styled } from '../../../theme'
import { NewRepo, Tree } from '../../molecules'

const Style = styled.div`
  flex: 0 0 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: sidebar;
    resize: horizontal;
    min-width: ${({ theme }) => theme.spacing.xxl};
    max-width: 50vw;
    overflow-x: auto;
  }

  .Sidebar-title-wrapper {
    flex: 0 1 auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.xs};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  return (
    <Style id={CONTAINER_ID.SIDEBAR}>
      <Tree />
      <NewRepo />
    </Style>
  )
}
