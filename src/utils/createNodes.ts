import { Node_Type, TreeFileFragment } from '../components/apollo'
import { ITreeNode } from '../types'
import { isFile } from './isFile'

export function createFolderNode(
  id: string,
  name: string,
  path: string,
  toggled: boolean,
  isOptimistic: boolean
) {
  return {
    id,
    children: [],
    name,
    path,
    toggled,
    type: Node_Type.Folder,
    isOptimistic,
  }
}

export function createFileNode(
  id: string,
  name: string,
  path: string,
  isOptimistic: boolean
) {
  return {
    id,
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

export function createNode(
  id: string,
  type: Node_Type,
  slug: string,
  path: string,
  listOfToggledPaths: Set<string>,
  isOptimistic = false
) {
  const isFile = type === Node_Type.File

  return isFile
    ? createFileNode(id, slug, path, isOptimistic)
    : createFolderNode(
        id,
        slug,
        path,
        listOfToggledPaths.has(path),
        isOptimistic
      )
}

interface IInsertNodes {
  path: string[]
  parentNode: ITreeNode
  gitNode: TreeFileFragment
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
  // We've got to the leaf node of the path
  if (path.length === 1) {
    const [slug] = path

    const children = parentNode?.children ? parentNode.children : []

    // Setting the sha value to optimistic during moveFile update function
    // optimistic update. This allows us to determine if the change is in flight
    // in NodeItem
    const node = createNode(
      gitNode.id,
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
    const parentPath = parentNode.path ? `${parentNode.path}/${slug}` : nextPath

    parentNode.children = [
      ...parentNode.children,
      createFolderNode(
        parentPath,
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
  gitNodes: TreeFileFragment[],
  listOfToggledPaths: Set<string>
) {
  return gitNodes.reduce<ITreeNode[]>((acc, gitNode) => {
    const { path } = gitNode

    const [rootSlug, ...restOfPath] = path.split('/')

    // Does the parent of the root slug exist at the top level in our
    // accumulated list already?
    const parentNode = getNode(acc, rootSlug)

    // If the parent does exist and it's a file, we've created a file with the
    // same name and the optimistic result has got through to here.
    // Lets just ignore that and let the graphql error show
    if (isFile(parentNode?.path)) {
      return acc
    }

    // If the parent does exist let's start the process of inserting it into
    // the tree
    if (parentNode) {
      insertNodeIntoParentNode({
        path: restOfPath,
        parentNode,
        gitNode,
        listOfToggledPaths,
      })

      return acc
    }

    // At this point we're only dealing with optimistic results or top-level
    // files/folders. If it's a file with additional path slugs, the optimistic
    // update has run and generated a file without a parent gitNode.
    // Otherwise we have a top level file/folder.
    const isNestedFiled = isFile(path) && restOfPath.length > 0

    if (isNestedFiled) {
      // Create a parent node and insert file node into it. Any other missing
      // parent nodes further along the path will be created inside
      // insertNodeIntoParentNode.
      const newParentNode = createNode(
        rootSlug,
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
        createNode(
          gitNode.id,
          gitNode.type,
          rootSlug,
          path,
          listOfToggledPaths,
          gitNode.sha === 'optimistic'
        ),
      ]
    }
  }, [])
}
