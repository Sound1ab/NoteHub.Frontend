import React, { useEffect, useState } from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadNodes } from '../../../hooks'
import { styled } from '../../../theme'
import { ITreeNode } from '../../../types'
import { createNodes } from '../../../utils'
import { Node } from '../../molecules'

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

  const [data, setData] = useState<ITreeNode | null>(null)

  useEffect(() => {
    if (!gitNodes) {
      return
    }

    const tree = createNodes(gitNodes, data)

    setData(tree)
  }, [gitNodes])

  if (!gitNodes || loading) {
    return null
  }

  if (!data) {
    return null
  }

  function onToggle(node: ITreeNode, toggled: boolean) {
    if (!data) {
      return
    }

    node.toggled = toggled

    setData({ ...data })
  }

  return (
    <Style id={CONTAINER_ID.SIDEBAR}>
      <Node node={data} onToggle={onToggle} />
    </Style>
  )
}
