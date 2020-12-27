import {
  Node_Type,
  TreeFileFragment,
} from '../components/apollo/generated_components_typings'
import { IFileNode, IFolderNode, ITreeNode } from '../types'
import { extractFilename } from './extractFilename'
import { isFile } from './isFile'

export function createFolderNode({
  path,
  id,
  name,
  toggled,
  sha,
}: TreeFileFragment & {
  name: string
  toggled: boolean
}): IFolderNode {
  return {
    id,
    children: [],
    name,
    path,
    toggled,
    type: Node_Type.Folder,
    isOptimistic: sha === 'optimistic',
  }
}

export function createFileNode({ id, sha, path }: TreeFileFragment): IFileNode {
  return {
    id,
    name: extractFilename(path),
    path,
    type: Node_Type.File,
    isOptimistic: sha === 'optimistic',
  }
}

export function createNodes(
  gitNodes: TreeFileFragment[],
  listOfToggledPaths: Set<string>
) {
  const parentNode: IFolderNode = {
    children: [],
    id: 'ROOT',
    isOptimistic: false,
    name: '',
    path: '',
    toggled: false,
    type: Node_Type.Folder,
  }

  for (let i = 0; i < gitNodes.length; i++) {
    const gitNode = gitNodes[i]

    const pathParts = gitNode.path.split('/')

    let currentNode: IFolderNode = parentNode

    while (pathParts.length > 0) {
      const slug = pathParts.shift()

      if (!slug) {
        throw new Error('slug is undefined')
      }

      if (pathParts.length === 0) {
        const oldNode = findNode(currentNode.children, slug)

        const newNode = isFile(slug)
          ? createFileNode(gitNode)
          : createFolderNode({
              ...gitNode,
              path: getPath(currentNode, slug),
              name: slug,
              toggled: listOfToggledPaths.has(gitNode.path),
            })

        if (oldNode) {
          currentNode.children.map((node) =>
            node.path === gitNode.path ? newNode : node
          )
        } else {
          currentNode.children.push(newNode)
        }

        continue
      }

      const nextNode = findNode(currentNode.children, slug)

      if (!nextNode) {
        const path = getPath(currentNode, slug)

        const folderNode = createFolderNode({
          ...gitNode,
          path,
          name: slug,
          toggled: listOfToggledPaths.has(path),
        })

        currentNode.children.push(folderNode)

        currentNode = folderNode

        continue
      }

      if (!isFolderNode(nextNode)) {
        throw new Error('Next node is a file not a folder')
      }

      currentNode = nextNode
    }
  }

  return parentNode.children
}

export function traverseTree(
  root: IFolderNode,
  nodeMutator: (node: ITreeNode) => void
) {
  const queue: ITreeNode[] = []

  queue.push(root)

  while (queue.length > 0) {
    const size = queue.length

    let current: ITreeNode | undefined

    for (let i = 0; i < size; i++) {
      current = queue.shift()

      if (!current) {
        return
      }

      nodeMutator(current)

      if (!isFolderNode(current)) {
        continue
      }

      for (const child of current.children) {
        queue.push(child)
      }
    }
  }
}

function findNode(nodes: ITreeNode[], slug: string) {
  return nodes.find((node) => node.name === slug)
}

function getPath(node: ITreeNode, slug: string) {
  return isRoot(node) ? slug : `${node.path}/${slug}`
}

function isRoot(node: ITreeNode) {
  return node.id === 'ROOT'
}

export function isFolderNode(node: ITreeNode): node is IFolderNode {
  return node.type === Node_Type.Folder
}
