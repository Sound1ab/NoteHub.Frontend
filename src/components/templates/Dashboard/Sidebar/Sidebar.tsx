import React, { useState } from 'react'
import styled from 'styled-components'

import { CONTAINER_ID } from '../../../../enums'
import { Button } from '../../../atoms/Button/Button'
import { Icon } from '../../../atoms/Icon/Icon'
import { FileTree } from './FileTree/FileTree'
import { SearchInput } from './SearchInput/SearchInput'
import { useSearch } from '../../../../hooks/recoil/useSearch'

export function Sidebar() {
  const [search] = useSearch()
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)

  return (
    <StyledSidebar id={CONTAINER_ID.SIDEBAR}>
      <SearchInput />
      <Navigation>
        <FileTree
          isNewFileOpen={isNewFileOpen}
          closeNewFile={() => setIsNewFileOpen(false)}
        />
      </Navigation>
      <StyledButton
        onClick={() => setIsNewFileOpen(true)}
        isDisabled={Boolean(search)}
      >
        <PlusIcon size="1x" icon="plus-circle" />
        <Add>New file</Add>
      </StyledButton>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  flex: 0 0 100%;
  height: 100vh;
  background-color: var(--background-primary);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid var(--border-primary);
  // Needed to contain children from overflowing and make flex item scroll
  overflow-y: auto;
  z-index: 2;
  position: sticky;
  top: 0px;
  align-self: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: sidebar;
    resize: horizontal;
    min-width: ${({ theme }) => theme.spacing.xxxl};
    max-width: 50vw;
    overflow-x: auto;
  }
`

const Navigation = styled.nav`
  flex: 1;
  overflow-y: auto;
`

const StyledButton = styled(Button)`
  flex: 0;
  display: flex;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xs};
`

const Add = styled.span`
  font-weight: 700;
  margin-bottom: 0;
  line-height: inherit;
`

const PlusIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing.xs};

  svg {
    color: var(--accent-primary);
  }
`
