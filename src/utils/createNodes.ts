import { GitNode } from '../components/apollo/generated_components_typings'
import { ITreeNode } from '../components/molecules/Tree/types'

export function createFolderNode(name: string, { path, type }: GitNode) {
  return {
    children: [],
    name,
    path,
    toggled: true,
    type,
  }
}

export function createFileNode(name: string, { path, type }: GitNode) {
  return {
    name,
    path,
    toggled: true,
    type,
  }
}

export function createNode(
  path: string[],
  type: string,
  currentNode: ITreeNode,
  gitNode: GitNode
): void {
  if (path.length === 1) {
    const [name] = path

    const children = currentNode?.children ? currentNode.children : []

    const isFolder = type === 'tree'

    currentNode.children = [
      ...children,
      isFolder
        ? createFolderNode(name, gitNode)
        : createFileNode(name, gitNode),
    ]
    return
  }

  if (!currentNode.children) {
    throw new Error('CurrentNode has no children')
  }

  const [currentPath, ...rest] = path

  const nextNode = currentNode.children.find(node => node.name === currentPath)

  if (!nextNode) {
    throw new Error('Unable to find next node')
  }

  return createNode(rest, type, nextNode, gitNode)
}

export function createNodes(gitNodes: GitNode[]) {
  const treeBeard: ITreeNode = {
    children: [],
    name: 'root',
    path: '/',
    toggled: true,
    type: 'tree',
  }

  for (const gitNode of gitNodes) {
    const { path, type } = gitNode

    createNode(path.split('/'), type, treeBeard, gitNode)
  }

  return treeBeard?.children ?? []
}
