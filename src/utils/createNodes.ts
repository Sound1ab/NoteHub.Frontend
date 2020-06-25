import {
  GitNode,
  Node_Type,
} from '../components/apollo/generated_components_typings'
import { ITreeNode } from '../types'

export function createFolderNode(name: string, path: string, toggled: boolean) {
  return {
    children: [],
    name,
    path,
    toggled,
    type: Node_Type.Folder,
  }
}

export function createFileNode(name: string, path: string) {
  return {
    name,
    path,
    toggled: false,
    type: Node_Type.File,
  }
}

interface ICreateNode {
  path: string[]
  parentNode: ITreeNode
  gitNode: GitNode
  currentPath?: string
  listOfToggledPaths: Set<string>
}

export function createNode({
  path,
  parentNode,
  gitNode,
  currentPath = '',
  listOfToggledPaths,
}: ICreateNode): void {
  if (path.length === 1) {
    const [slug] = path

    const children = parentNode?.children ? parentNode.children : []

    const isFile = gitNode.type === Node_Type.File

    const node = isFile
      ? createFileNode(slug, gitNode.path)
      : createFolderNode(
          slug,
          gitNode.path,
          listOfToggledPaths.has(gitNode.path)
        )

    parentNode.children = [...children, node]

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
      createFolderNode(slug, nextPath, listOfToggledPaths.has(nextPath)),
    ]

    return createNode({
      path,
      parentNode,
      gitNode,
      currentPath,
      listOfToggledPaths,
    })
  }

  return createNode({
    path: rest,
    parentNode: nextNode,
    gitNode,
    currentPath: nextPath,
    listOfToggledPaths,
  })
}

export function createNodes(
  gitNodes: GitNode[],
  listOfToggledPaths: Set<string>
) {
  const treeBeard: ITreeNode = {
    children: [],
    name: 'Notes',
    path: 'Notes',
    toggled: listOfToggledPaths.has('Notes'),
    type: Node_Type.Folder,
  }

  for (const gitNode of gitNodes) {
    const { path } = gitNode

    createNode({
      path: path.split('/'),
      parentNode: treeBeard,
      gitNode,
      listOfToggledPaths,
    })
  }

  return treeBeard
}
