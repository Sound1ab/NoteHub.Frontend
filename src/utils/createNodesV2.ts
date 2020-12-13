import { Node_Type, TreeFileFragment } from '../components/apollo'
import { IFolderNode, ITreeNode } from '../types'
import { createFileNode, createFolderNode } from './createNodes'
import { isFile } from './isFile'

export function createNodes(
  gitNodes: TreeFileFragment[],
  listOfToggledPaths: Set<string>
) {
  const parentNode: IFolderNode = {
    children: [],
    id: '',
    isOptimistic: false,
    name: '',
    path: '',
    toggled: false,
    type: Node_Type.Folder,
  }

  for (let i = 0; i < gitNodes.length; i++) {
    const gitNode = gitNodes[i]

    const pathParts = gitNode.path.split('/')

    let currentNode: IFolderNode | null = parentNode

    while (currentNode) {
      const slug = pathParts.shift()

      if (!slug) {
        throw new Error('slug is undefined')
      }

      if (isFile(slug)) {
        const fileNode = createFileNode(gitNode)

        currentNode.children.push(fileNode)

        currentNode = null

        return
      }

      const nextNode: ITreeNode | undefined = currentNode.children.find(
        (node) => node.name === slug
      )

      if (!nextNode) {
        const folderNode = createFolderNode({
          ...gitNode,
          name: slug,
          toggled: listOfToggledPaths.has(slug),
        })

        currentNode.children.push(folderNode)

        currentNode = folderNode

        return
      }

      if (!isFolderNode(nextNode)) {
        throw new Error('Next node is a file not a folder')
      }

      currentNode = nextNode
    }
  }

  return parentNode.children
}

function isFolderNode(node: ITreeNode): node is IFolderNode {
  return 'children' in node
}
