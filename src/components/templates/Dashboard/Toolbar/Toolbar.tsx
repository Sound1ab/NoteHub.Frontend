import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

import { useFile } from '../../../../hooks/recoil/useFile'
import { useTabs } from '../../../../hooks/recoil/useTabs'
import { setCssVariable } from '../../../../utils/css/setCssVariable'
import { extractFilename } from '../../../../utils/extractFilename'
import { SearchInput } from '../Sidebar/SearchInput/SearchInput'
import { Profile } from './Profile/Profile'
import { Tab } from './Tab/Tab'

export function Toolbar() {
  const [tabs] = useTabs()
  const [file] = useFile()
  const toolbarRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!toolbarRef?.current) return

    setCssVariable('--toolbar-height', `${toolbarRef.current.offsetHeight}px`)
  }, [])

  return (
    <StyledToolbar ref={toolbarRef}>
      <SearchInput />
      <Tabs>
        {[...tabs].map((path) => (
          <Tab
            key={path}
            name={extractFilename(path)}
            path={path}
            isDisabled={file?.path === path} // TODO: MAKE OPTIMISTIC file.sha === 'optimistic'
          />
        ))}
      </Tabs>
      <Actions>
        <Profile />
      </Actions>
    </StyledToolbar>
  )
}

const StyledToolbar = styled.header`
  grid-area: toolbar;
  width: 100%;
  display: flex;
  background-color: var(--background-primary);
  // Needed to contain children from overflowing and make flex item scroll
  overflow-x: auto;
  z-index: 3;
  position: sticky;
  top: 0px;
  align-self: start;
  border-bottom: 1px solid var(--border-primary);
  height: ${({ theme }) => theme.spacing.xl};
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
