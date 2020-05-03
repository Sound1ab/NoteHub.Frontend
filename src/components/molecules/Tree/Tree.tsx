import React, { useEffect, useState } from 'react'

import { useReadNodes } from '../../../hooks'
import { ITreeNode } from '../../../types'
import { createNodes } from '../../../utils/createNodes'
import { Node } from './Node'

export function Tree() {
  const { gitNodes, loading } = useReadNodes()

  const [data, setData] = useState<ITreeNode | null>(null)

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

  if (!data) {
    return null
  }

  function onToggle(node: ITreeNode) {
    if (!data) {
      return
    }

    node.toggled = !node.toggled

    setData({ ...data })
  }

  return <Node node={data} onToggle={onToggle} />
}
