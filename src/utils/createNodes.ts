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

function getNode(nodes: ITreeNode[], slug: string) {
  return nodes.find(node => node.name === slug)
}

function createNode(
  type: Node_Type,
  slug: string,
  path: string,
  listOfToggledPaths: Set<string>
) {
  const isFile = type === Node_Type.File

  return isFile
    ? createFileNode(slug, path)
    : createFolderNode(slug, path, listOfToggledPaths.has(path))
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

    const node = createNode(
      gitNode.type,
      slug,
      gitNode.path,
      listOfToggledPaths
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
  // a parent gitNode. Create one and retry.
  if (!nextNode) {
    const parentPath = parentNode.path
      ? `${parentNode.path}/${nextPath}`
      : nextPath

    parentNode.children = [
      ...parentNode.children,
      createFolderNode(slug, parentPath, listOfToggledPaths.has(parentPath)),
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

    const [rootSlug] = path.split('/')

    const parentNode = getNode(acc, rootSlug)

    if (!parentNode) {
      return [
        ...acc,
        createNode(gitNode.type, rootSlug, path, listOfToggledPaths),
      ]
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...restOfPath] = path.split('/')

      insertNodeIntoParentNode({
        path: restOfPath,
        parentNode,
        gitNode,
        listOfToggledPaths,
      })

      return acc
    }
  }, [])
}
