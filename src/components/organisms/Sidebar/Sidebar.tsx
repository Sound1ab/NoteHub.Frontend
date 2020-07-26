import React, { useState } from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadNodes } from '../../../hooks'
import { styled } from '../../../theme'
import { createNodes } from '../../../utils'
import { List } from '../../atoms'
import { Tree } from '../../molecules'

const Style = styled.div`
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

export function Sidebar() {
  const { gitNodes, loading } = useReadNodes()
  const [listOfToggledPaths, setListOfToggledPaths] = useState<Set<string>>(
    new Set(['Notes'])
  )

  if (!gitNodes || loading) {
    return null
  }

  function onToggle(path: string, toggled: boolean) {
    if (toggled) {
      listOfToggledPaths.add(path)
    } else {
      listOfToggledPaths.delete(path)
    }
    setListOfToggledPaths(new Set(listOfToggledPaths))
  }

  return (
    <Style id={CONTAINER_ID.SIDEBAR}>
      <List>
        <Tree
          nodes={createNodes(gitNodes, listOfToggledPaths)}
          onToggle={onToggle}
        />
      </List>
    </Style>
  )
}
