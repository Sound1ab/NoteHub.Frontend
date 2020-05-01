import { ITreeNode } from '../components/molecules/Tree/types'

export function createFileNode(
  name: string,
  { path, type }: Pick<ITreeNode, 'path' | 'type'>
) {
  return {
    name,
    path,
    toggled: true,
    type,
  }
}

export function updateNode(
  currentPath: string[],
  currentNode: ITreeNode,
  path: string
): void {
  if (currentPath.length === 1) {
    const [name] = currentPath

    const children = currentNode?.children ? currentNode.children : []

    currentNode.children = [
      ...children,
      createFileNode(name, { path, type: 'blob' }),
    ]
    return
  }

  if (!currentNode.children) {
    throw new Error('CurrentNode has no children')
  }

  const [nextPath, ...rest] = currentPath

  const nextNode = currentNode.children.find(node => node.name === nextPath)

  if (!nextNode) {
    throw new Error('Unable to find next node')
  }

  return updateNode(rest, nextNode, path)
}
