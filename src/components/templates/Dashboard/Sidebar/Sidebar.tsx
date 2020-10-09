import React, { useState } from 'react'

import { CONTAINER_ID } from '../../../../enums'
import { useReadSearch } from '../../../../hooks'
import { styled } from '../../../../theme'
import { Button, Icon } from '../../../atoms'
import { FileTree } from './FileTree/FileTree'
import { SearchInput } from './SearchInput/SearchInput'

export function Sidebar() {
  const { search } = useReadSearch()
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
        <PlusIcon size="lg" icon={'plus-circle'} />
        <Add>New folder</Add>
      </StyledButton>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  flex: 0 0 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-area: sidebar;
    resize: horizontal;
    min-width: ${({ theme }) => theme.spacing.xxl};
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
  width: 100%;
  height: 100%;
`

const Add = styled.h4`
  margin-bottom: 0;
`

const PlusIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing.xs};

  svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`
