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
    toggled: false,
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
    toggled: false,
    type,
  }
}

interface ICreateNode {
  path: string[]
  type: string
  parentNode: ITreeNode
  gitNode: GitNode
  isUpdate: boolean
  currentPath?: string
}

export function createNode({
  currentPath = '',
  gitNode,
  parentNode,
  path,
  type,
  isUpdate,
}: ICreateNode): void {
  if (path.length === 1) {
    const [slug] = path

    const children = parentNode?.children ? parentNode.children : []

    const isFile = type === Node_Type.File

    // If next node exists keep it so toggled state persists
    const nextNode = children.find(node => node.name === slug)

    if (nextNode) {
      return
    }

    // Only toggle folder open if new node is being added
    parentNode.toggled = isUpdate

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

  // If no next node the gitNode array may be out of order (happens with optimistic
  // updates). Create the node and try again
  if (!nextNode) {
    parentNode.children = [
      ...parentNode.children,
      createFolderNode(slug, {
        type: Node_Type.Folder,
        path: nextPath,
      }),
    ]

    return createNode({
      path,
      type,
      parentNode,
      gitNode,
      currentPath,
      isUpdate,
    })
  }

  return createNode({
    path: rest,
    type,
    parentNode: nextNode,
    gitNode,
    currentPath: nextPath,
    isUpdate,
  })
}

export function createNodes(gitNodes: GitNode[], tree?: ITreeNode | null) {
  const treeBeard: ITreeNode = tree
    ? { ...tree }
    : {
        children: [],
        name: 'Notes',
        path: '',
        toggled: true,
        type: Node_Type.Folder,
      }

  for (const gitNode of gitNodes) {
    const { path, type } = gitNode

    createNode({
      path: path.split('/'),
      type,
      parentNode: treeBeard,
      gitNode,
      isUpdate: !!tree,
    })
  }

  return treeBeard
}
