import {
  GitNode,
  Node_Type,
} from '../components/apollo/generated_components_typings'
import { ITreeNode } from '../types'
import { isFile } from './isFile'

export function createFolderNode(
  name: string,
  path: string,
  toggled: boolean,
  isOptimistic: boolean
) {
  return {
    children: [],
    name,
    path,
    toggled,
    type: Node_Type.Folder,
    isOptimistic,
  }
}

export function createFileNode(
  name: string,
  path: string,
  isOptimistic: boolean
) {
  return {
    name,
    path,
    toggled: false,
    type: Node_Type.File,
    isOptimistic,
  }
}

function getNode(nodes: ITreeNode[], slug: string) {
  return nodes.find((node) => node.name === slug)
}

function createNode(
  type: Node_Type,
  slug: string,
  path: string,
  listOfToggledPaths: Set<string>,
  isOptimistic = false
) {
  const isFile = type === Node_Type.File

  return isFile
    ? createFileNode(slug, path, isOptimistic)
    : createFolderNode(slug, path, listOfToggledPaths.has(path), isOptimistic)
}

interface IInsertNodes {
  path: string[]
  parentNode: ITreeNode
  gitNode: GitNode
  currentPath?: string
  listOfToggledPaths: Set<string>
}

export function insertNodeIntoParentNode({
  path,
  parentNode,
  gitNode,
  currentPath = '',
  listOfToggledPaths,
}: IInsertNodes): void {
  if (path.length === 1) {
    const [slug] = path

    const children = parentNode?.children ? parentNode.children : []

    // Setting the sha value to optimistic during moveFile update function
    // optimistic update. This allows us to determine if the change is in flight
    // in NodeItem
    const node = createNode(
      gitNode.type,
      slug,
      gitNode.path,
      listOfToggledPaths,
      gitNode.sha === 'optimistic'
    )

    parentNode.children = [...children, node]

    return
  }

  if (!parentNode.children) {
    throw new Error('CurrentNode has no children')
  }

  const [slug, ...rest] = path

  const nextNode = getNode(parentNode.children, slug)

  const nextPath = currentPath ? `${currentPath}/${slug}` : slug

  // If no next node the optimistic update has run and generated a file without
  // a parent gitNode. Create parent node and retry.
  if (!nextNode) {
    const parentPath = parentNode.path
      ? `${parentNode.path}/${nextPath}`
      : nextPath

    parentNode.children = [
      ...parentNode.children,
      createFolderNode(
        slug,
        parentPath,
        listOfToggledPaths.has(parentPath),
        false // Child is optimistic not this node
      ),
    ]

    return insertNodeIntoParentNode({
      path,
      parentNode,
      gitNode,
      currentPath,
      listOfToggledPaths,
    })
  }

  return insertNodeIntoParentNode({
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
  return gitNodes.reduce<ITreeNode[]>((acc, gitNode) => {
    const { path } = gitNode

    const [rootSlug, ...restOfPath] = path.split('/')

    const parentNode = getNode(acc, rootSlug)

    if (parentNode) {
      insertNodeIntoParentNode({
        path: restOfPath,
        parentNode,
        gitNode,
        listOfToggledPaths,
      })

      return acc
    }

    if (isFile(path) && restOfPath.length > 0) {
      // If no parentNode and its a file inside a folder, the optimistic update has
      // run and generated a file without a parent gitNode. Create a parent node
      // and insert file node. Any other missing parent nodes further along the path
      // will be created inside insertNodeIntoParentNode.
      const newParentNode = createNode(
        Node_Type.Folder,
        rootSlug,
        rootSlug,
        listOfToggledPaths
      )

      insertNodeIntoParentNode({
        path: restOfPath,
        parentNode: newParentNode,
        gitNode,
        listOfToggledPaths,
      })

      return [...acc, newParentNode]
    } else {
      // Else we just have a top level file/folder that we need to create.
      return [
        ...acc,
        createNode(gitNode.type, rootSlug, path, listOfToggledPaths),
      ]
    }
  }, [])
}
