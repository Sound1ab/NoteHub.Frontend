import React, { useState } from 'react'

import { CONTAINER_ID } from '../../../../enums'
import { useReadNodes, useReadSearch } from '../../../../hooks'
import { styled } from '../../../../theme'
import { createNodes } from '../../../../utils'
import { Button, Icon, List } from '../../../atoms'
import { FileInput } from './FileInput/FileInput'
import { SearchResults, Tree, TreeSkeleton } from './FileTree'
import { SearchInput } from './SearchInput/SearchInput'

export function Sidebar() {
  const [isNewFileOpen, setIsNewFileOpen] = useState(false)
  const { gitNodes, loading } = useReadNodes()
  const [listOfToggledPaths, setListOfToggledPaths] = useState<Set<string>>(
    new Set([])
  )
  const { search } = useReadSearch()

  function onToggle(path: string, toggled: boolean) {
    if (toggled) {
      listOfToggledPaths.add(path)
    } else {
      listOfToggledPaths.delete(path)
    }
    setListOfToggledPaths(new Set(listOfToggledPaths))
  }

  return (
    <StyledSidebar id={CONTAINER_ID.SIDEBAR}>
      {loading ? (
        <TreeSkeleton />
      ) : (
        <>
          <SearchInput />
          <Navigation>
            {search ? (
              <SearchResults />
            ) : (
              <>
                {gitNodes &&
                  createNodes(gitNodes, listOfToggledPaths).map((node) => (
                    <List key={node.name}>
                      <Tree key={node.name} node={node} onToggle={onToggle} />
                    </List>
                  ))}
                {isNewFileOpen && (
                  <FileInput
                    onClickOutside={() => setIsNewFileOpen(false)}
                    onToggle={onToggle}
                    action="create"
                  />
                )}
              </>
            )}
          </Navigation>
        </>
      )}
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
