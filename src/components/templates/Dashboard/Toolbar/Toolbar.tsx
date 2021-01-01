import React from 'react'
import styled from 'styled-components'

import { useCodeMirror } from '../../../../hooks/context/useCodeMirror'
import { useReadFile } from '../../../../hooks/file/useReadFile'
import { useReadTabs } from '../../../../hooks/localState/useReadTabs'
import { extractFilename } from '../../../../utils/extractFilename'
import { Icon } from '../../../atoms/Icon/Icon'
import { Profile } from './Profile/Profile'
import { Tab } from './Tab/Tab'
import { ToolbarButton } from './ToolbarButton/ToolbarButton'

export function Toolbar() {
  const {
    isSideBySideActive,
    isPreviewActive,
    togglePreview,
    toggleSideBySide,
  } = useCodeMirror()
  const tabs = [...useReadTabs()]
  const { file } = useReadFile()

  return (
    <StyledToolbar>
      <Tabs>
        {tabs.map((path) => (
          <Tab
            key={path}
            name={extractFilename(path)}
            path={path}
            isDisabled={file?.path === path && file.sha === 'optimistic'}
          />
        ))}
      </Tabs>
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
  background-color: var(--background-primary);
  // Needed to contain children from overflowing and make flex item scroll
  overflow-x: auto;
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 1;
`

const Tabs = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  overflow-x: auto;
`

const Actions = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
`
