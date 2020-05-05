import {
  GitNode,
  Node_Type,
} from '../components/apollo/generated_components_typings'
import { ITreeNode } from '../types'

export function createFolderNode(
  name: string,
  { path, type }: Pick<GitNode, 'path' | 'type'>
) {
  return {
    children: [],
    name,
    path,
    toggled: true,
    type,
  }
}

export function createFileNode(
  name: string,
  { path, type }: Pick<GitNode, 'path' | 'type'>
) {
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
  parentNode: ITreeNode,
  gitNode: GitNode,
  currentPath = ''
): void {
  if (path.length === 1) {
    const [slug] = path

    const children = parentNode?.children ? parentNode.children : []

    const isFile = type === Node_Type.File

    parentNode.children = [
      ...children,
      isFile ? createFileNode(slug, gitNode) : createFolderNode(slug, gitNode),
    ]
    return
  }

  if (!parentNode.children) {
    throw new Error('CurrentNode has no children')
  }

  const [slug, ...rest] = path

  const nextNode = parentNode.children.find(node => node.name === slug)

  const nextPath = currentPath ? `${currentPath}/${slug}` : slug

  if (!nextNode) {
    parentNode.children = [
      ...parentNode.children,
      createFolderNode(slug, {
        type: Node_Type.Folder,
        path: nextPath,
      }),
    ]

    return createNode(path, type, parentNode, gitNode, currentPath)
  }

  return createNode(rest, type, nextNode, gitNode, nextPath)
}

export function createNodes(gitNodes: GitNode[]) {
  const treeBeard: ITreeNode = {
    children: [],
    name: 'Notes',
    path: '',
    toggled: true,
    type: Node_Type.Folder,
  }

  for (const gitNode of gitNodes) {
    const { path, type } = gitNode

    createNode(path.split('/'), type, treeBeard, gitNode)
  }

  return treeBeard
}
