import { Node_Type } from '../../components/apollo/generated_components_typings'

export const rootFile = {
  mode: '100644',
  path: 'README.md',
  sha: '21e60f8358c6175f2efbbe34808a4d99d12d18ee',
  size: 6,
  type: Node_Type.File,
  url:
    'https://api.github.com/repos/Sound1ab/NoteHub.Test/git/blobs/21e60f8358c6175f2efbbe34808a4d99d12d18ee',
}

const fileDepthOne = {
  mode: '100644',
  path: 'folder/file.md',
  sha: '3e23ae484d9e26ececeb15b44c3393420f863766',
  size: 7,
  type: Node_Type.File,
  url:
    'https://api.github.com/repos/Sound1ab/NoteHub.Test/git/blobs/3e23ae484d9e26ececeb15b44c3393420f863766',
}

const fileDepthTwo = {
  mode: '100644',
  path: 'folder/folder2/file2.md',
  sha: '1385f264afb75a56a5bec74243be9b367ba4ca08',
  size: 4,
  type: Node_Type.File,
  url:
    'https://api.github.com/repos/Sound1ab/NoteHub.Test/git/blobs/1385f264afb75a56a5bec74243be9b367ba4ca08',
}

export const rootFolder = {
  mode: '040000',
  path: 'folder',
  sha: '440bcc562c69b0ccb7e71d54f57a0d802447b60d',
  size: 6,
  type: Node_Type.Folder,
  url:
    'https://api.github.com/repos/Sound1ab/NoteHub.Test/git/trees/440bcc562c69b0ccb7e71d54f57a0d802447b60d',
}

const folderDepthOne = {
  mode: '040000',
  path: 'folder/folder2',
  sha: 'f19f8947571bee8b58cc9a13e245684b1209a259',
  size: 6,
  type: Node_Type.Folder,
  url:
    'https://api.github.com/repos/Sound1ab/NoteHub.Test/git/trees/f19f8947571bee8b58cc9a13e245684b1209a259',
}

export const githubTreeData = [
  rootFile,
  rootFolder,
  fileDepthOne,
  folderDepthOne,
  fileDepthTwo,
]

export const treeBeard = {
  children: [
    {
      name: 'README.md',
      path: 'README.md',
      toggled: false,
      type: Node_Type.File,
    },
    {
      children: [
        {
          name: 'file.md',
          path: 'folder/file.md',
          toggled: false,
          type: Node_Type.File,
        },
        {
          children: [
            {
              name: 'file2.md',
              path: 'folder/folder2/file2.md',
              toggled: false,
              type: Node_Type.File,
            },
          ],
          name: 'folder2',
          path: 'folder/folder2',
          toggled: false,
          type: Node_Type.Folder,
        },
      ],
      name: 'folder',
      path: 'folder',
      toggled: false,
      type: Node_Type.Folder,
    },
  ],
  name: 'Notes',
  path: '',
  toggled: false,
  type: Node_Type.Folder,
}

export const createNextNode = {
  children: [
    {
      children: [],
      name: 'OTHER_MOCK_FOLDER',
      path: 'OTHER_MOCK_FOLDER',
      toggled: false,
      type: Node_Type.Folder,
    },
    {
      children: [
        {
          name: 'MOCK_FILE.md',
          path: 'MOCK_FOLDER/MOCK_FILE.md',
          toggled: false,
          type: Node_Type.File,
        },
      ],
      name: 'MOCK_FOLDER',
      path: 'MOCK_FOLDER',
      toggled: true,
      type: Node_Type.Folder,
    },
  ],
  name: 'Notes',
  path: '',
  toggled: true,
  type: Node_Type.Folder,
}
