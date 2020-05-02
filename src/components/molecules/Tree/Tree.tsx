import { useApolloClient } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'

import { CONTAINER_ID } from '../../../enums'
import { useReadNodes } from '../../../hooks'
import { styled } from '../../../theme'
import { scrollIntoView } from '../../../utils'
import { createNodes } from '../../../utils/createNodes'
import { Node } from './Node'
import { ITreeNode } from './types'

const Style = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  overflow: auto;
`

export function Tree() {
  const client = useApolloClient()
  const { gitNodes, loading } = useReadNodes()

  const [data, setData] = useState<ITreeNode[]>([])

  useEffect(() => {
    if (!gitNodes) {
      return
    }

    const tree = createNodes(gitNodes)

    setData(tree)
  }, [gitNodes])

  if (!gitNodes || loading) {
    return null
  }

  function onClick(node: ITreeNode) {
    if (node.children) {
      node.toggled = !node.toggled
    } else {
      client.writeData({
        data: { currentFileName: node.name },
      })
    }

    setData([...data])

    scrollIntoView(CONTAINER_ID.EDITOR)
  }

  function renderNodes(tree: ITreeNode[]) {
    const nodes = []

    for (const node of tree) {
      const { name, children, toggled, type } = node

      nodes.push(
        <Node
          name={name}
          childNodes={children}
          toggled={toggled}
          node={node}
          renderNodes={renderNodes}
          onClick={node => onClick(node)}
          type={type}
          key={name}
        />
      )
    }

    return nodes
  }

  return <Style>{renderNodes(data)}</Style>
}
