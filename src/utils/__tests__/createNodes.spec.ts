import { Node_Type } from '../../components/apollo/generated_components_typings'
import { createNodes } from '../createNodes'

export const rootFile = {
  path: 'README.md',
  type: Node_Type.File,
  isOptimistic: false,
}

export const rootFolder = {
  path: 'folder',
  type: Node_Type.Folder,
  isOptimistic: false,
}

const fileDepthOne = {
  path: 'folder/file.md',
  type: Node_Type.File,
  isOptimistic: false,
}

const folderDepthOne = {
  path: 'folder/folder2',
  type: Node_Type.Folder,
  isOptimistic: false,
}

const fileDepthTwo = {
  path: 'folder/folder2/file2.md',
  type: Node_Type.File,
  isOptimistic: false,
}

describe('createNodes', () => {
  it('should create a flattened object of nodes with children', async () => {
    const githubTreeData = [
      rootFile,
      rootFolder,
      fileDepthOne,
      folderDepthOne,
      fileDepthTwo,
    ]

    const treeObject = createNodes(githubTreeData, new Set())

    expect(treeObject).toMatchSnapshot()
  })

  it('should construct missing parent nodes that may have resulted from an optimistic update', async () => {
    const githubTreeData = [rootFile, fileDepthOne, fileDepthTwo]

    const treeObject = createNodes(githubTreeData, new Set())

    expect(treeObject).toMatchSnapshot()
  })

  it('should handle duplicate filenames at the top level', async () => {
    const githubTreeData = [rootFile, rootFile, fileDepthOne, fileDepthTwo]

    const treeObject = createNodes(githubTreeData, new Set())

    expect(treeObject).toMatchSnapshot()
  })
})
