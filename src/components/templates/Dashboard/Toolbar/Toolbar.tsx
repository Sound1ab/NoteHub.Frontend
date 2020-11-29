import React from 'react'
import styled from 'styled-components'

import { useEasyMDE } from '../../../../hooks'
import { Icon } from '../../../atoms'
import { Profile } from './Profile/Profile'
import { ToolbarButton } from './ToolbarButton/ToolbarButton'

export function Toolbar() {
  const {
    isSideBySideActive,
    isPreviewActive,
    togglePreview,
    toggleSideBySide,
  } = useEasyMDE()

  return (
    <StyledToolbar>
      <Actions>
        <ToolbarButton
          isActive={isSideBySideActive}
          onClick={() => toggleSideBySide?.()}
          title="Toggle side by side"
        >
          <Icon size="1x" icon="columns" />
        </ToolbarButton>
        <ToolbarButton
          isActive={isPreviewActive}
          onClick={() => togglePreview?.()}
          title="Toggle preview"
        >
          <Icon size="1x" icon="align-justify" />
        </ToolbarButton>
        <Profile />
      </Actions>
    </StyledToolbar>
  )
}

const StyledToolbar = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: relative;

    grid-area: toolbar;
    display: grid;
    @supports (grid-template-columns: subgrid) {
      grid-template-columns: subgrid;
    }
    @supports not (grid-template-columns: subgrid) {
      grid-template-columns:
        minmax(0, ${({ theme }) => theme.spacing.xl})
        minmax(0, ${({ theme }) => theme.spacing.xxl})
        3fr;
    }
    grid-template-rows: auto;
    grid-template-areas: 'repoactions editoractions';
  }
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
  grid-area: editoractions;
  width: 100%;
`
