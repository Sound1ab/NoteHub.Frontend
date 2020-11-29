import React from 'react'
import styled from 'styled-components'

import { useEasyMDE } from '../../../../hooks'
import { Icon } from '../../../atoms'
import { Profile } from './Profile/Profile'
import { ToolbarButton } from './ToolbarButton/ToolbarButton'

export function Toolbar() {
  const { easyMDE, editor } = useEasyMDE()

  function handleToggleSideBySide() {
    if (!editor) {
      return
    }
    try {
      easyMDE?.toggleSideBySide(editor)
    } catch {
      // Ignore errors
    }
  }

  function handlePreview() {
    if (!editor) {
      return
    }
    try {
      easyMDE?.togglePreview(editor)
    } catch {
      // Ignore errors
    }
  }

  console.log('preview', editor?.isPreviewActive())

  return (
    <StyledToolbar>
      <Actions>
        <ToolbarButton
          isActive={editor?.isSideBySideActive()}
          onClick={handleToggleSideBySide}
          title="Toggle side by side"
        >
          <Icon size="1x" icon="columns" />
        </ToolbarButton>
        <ToolbarButton
          isActive={editor?.isPreviewActive()}
          onClick={handlePreview}
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
