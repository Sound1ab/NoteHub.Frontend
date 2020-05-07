import { Node_Type } from '../../components/apollo/generated_components_typings'
import {
  createFileNode,
  createFolderNode,
  createNode,
  createNodes,
} from '../createNodes'
import {
  createNextNode,
  githubTreeData,
  rootFile,
  rootFolder,
  treeBeard,
} from './githubTreeData'

describe('tree', () => {
  it('should create a flattened object of nodes with children', async () => {
    const treeObject = createNodes(githubTreeData)

    expect(treeObject).toEqual(treeBeard)
  })
})

describe('createNode', () => {
  it('should throw an error if next node does not have children', async () => {
    const node = {
      name: 'root',
      path: 'MOCK_PATH',
      toggled: true,
      type: 'MOCK_TYPE',
    }

    expect(() =>
      createNode({
        path: ['MOCK_FOLDER', 'MOCK_FILE.md'],
        type: Node_Type.File,
        parentNode: node,
        gitNode: rootFile,
        isUpdate: true,
      })
    ).toThrow('CurrentNode has no children')
  })

  it('should create next node if it does not exist', async () => {
    const rootFile = {
      mode: '100644',
      path: 'MOCK_FOLDER/MOCK_FILE.md',
      sha: '21e60f8358c6175f2efbbe34808a4d99d12d18ee',
      size: 6,
      type: Node_Type.File,
      url:
        'https://api.github.com/repos/Sound1ab/NoteHub.Test/git/blobs/21e60f8358c6175f2efbbe34808a4d99d12d18ee',
    }

    const node = {
      children: [
        {
          children: [],
          name: 'OTHER_MOCK_FOLDER',
          path: 'OTHER_MOCK_FOLDER',
          toggled: false,
          type: Node_Type.Folder,
        },
      ],
      name: 'Notes',
      path: '',
      toggled: true,
      type: Node_Type.Folder,
    }

    createNode({
      path: ['MOCK_FOLDER', 'MOCK_FILE.md'],
      type: Node_Type.File,
      parentNode: node,
      gitNode: rootFile,
      isUpdate: true,
    })

    expect(node).toEqual(createNextNode)
  })
})

describe('createFolderNode', () => {
  it('should create a folder node', async () => {
    const folderNode = createFolderNode('MOCK_FOLDER', rootFolder)

    expect(folderNode).toEqual({
      children: [],
      name: 'MOCK_FOLDER',
      path: 'folder',
      toggled: false,
      type: Node_Type.Folder,
    })
  })
})

describe('createFileNode', () => {
  it('should create a folder node', async () => {
    const folderNode = createFileNode('MOCK_FILE.md', rootFile)

    expect(folderNode).toEqual({
      name: 'MOCK_FILE.md',
      path: 'README.md',
      toggled: false,
      type: Node_Type.File,
    })
  })
})
